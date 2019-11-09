import { graphql, Link, StaticQuery } from "gatsby"
import React from "react"

export default function Home() {
  return (
    <StaticQuery
      query={graphql`
        query AllPagesQuery {
          allMdx {
            edges {
              node {
                fields {
                  route
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <div>
            <h1>Page Index</h1>
            <div>
              {data.allMdx.edges.map((edge, index) => {
                const {
                  node: {
                    fields: { route },
                    frontmatter: { title },
                  },
                } = edge

                return (
                  <div key={index}>
                    <Link to={route}>{title}</Link>
                  </div>
                )
              })}
            </div>
          </div>
        )
      }}
    />
  )
}
