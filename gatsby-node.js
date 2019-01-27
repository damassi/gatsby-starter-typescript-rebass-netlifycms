// @ts-check

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const write = require("write")
const WebpackNotifierPlugin = require("webpack-notifier")
const path = require("path")
const { toLower } = require("lodash")
const { introspectionQuery, graphql, printSchema } = require("gatsby/graphql")
const { createFilePath } = require("gatsby-source-filesystem")

// TODO: Fix apollo type generation
// const WebpackShellPlugin = require("webpack-shell-plugin")

/**
 * Intercept and modify the GraphQL schema
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === "Mdx") {
    const route = toLower(
      createFilePath({
        node,
        getNode,
        trailingSlash: false,
      })
    )

    // Add a new field -- route -- which can be accessed from the schema under
    // fields { route }.
    actions.createNodeField({
      node,
      name: "route",
      value: route,
    })
  }
}

/**
 * Dynamically create pages for all .mdx content.
 *
 * NOTE: Content located in /pages is created automatically but should be limited
 * to static pages like "About" or "Home", etc, and is subject data limitations
 * since query data resolved below cannot be injected in at build time.
 */
exports.createPages = ({ graphql, actions }) => {
  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        query CreatePagesQuery {
          allMdx {
            edges {
              node {
                id
                fields {
                  route
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }

        result.data.allMdx.edges.forEach(({ node }) => {
          actions.createPage({
            // Encode the route
            path: node.fields.route,
            // Layout for the page
            component: path.resolve("./src/layouts/DefaultLayout.tsx"),
            // Values defined here are injected into the page as props and can
            // be passed to a GraphQL query as arguments
            context: {
              id: node.id,
            },
          })
        })
      })
    )
  })
}

/**
 * Add the file-system as an api proxy:
 * https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
 */
exports.onCreateDevServer = ({ app }) => {
  const fsMiddlewareAPI = require("netlify-cms-backend-fs/dist/fs")
  fsMiddlewareAPI(app)
}

/**
 * Update default Webpack configuration
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new WebpackNotifierPlugin({
        skipFirstNotification: true,
      }),

      // FIXME: Investigate Apollo error
      // new WebpackShellPlugin({
      //   onBuildEnd: ["yarn emit-graphql-types"],
      // }),
    ],
    resolve: {
      // Enable absolute import paths
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}

/**
 * Generate GraphQL schema.json file to be read by tslint
 * Thanks: https://gist.github.com/kkemple/6169e8dc16369b7c01ad7408fc7917a9
 */
exports.onPostBootstrap = async ({ store }) => {
  try {
    const { schema } = store.getState()
    const jsonSchema = await graphql(schema, introspectionQuery)
    const sdlSchema = printSchema(schema)

    write.sync("schema.json", JSON.stringify(jsonSchema.data), {})
    write.sync("schema.graphql", sdlSchema, {})

    console.log("\n\n[gatsby-plugin-extract-schema] Wrote schema\n") // eslint-disable-line
  } catch (error) {
    console.error(
      "\n\n[gatsby-plugin-extract-schema] Failed to write schema: ",
      error,
      "\n"
    )
  }
}
