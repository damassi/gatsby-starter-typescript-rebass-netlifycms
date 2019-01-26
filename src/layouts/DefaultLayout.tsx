import MDXRenderer from "gatsby-mdx/mdx-renderer"
import React from "react"
import { Box, Flex } from "rebass"
import { Link, graphql } from "gatsby"
import { Sans, Serif } from "components/ui/Typography"
import { NavTree } from "components/NavTree"

export default function DocsLayout(props) {
  const {
    data: {
      mdx: {
        code,
        frontmatter: { title },
      },
    },
  } = props

  return (
    <Flex>
      <Box mr="20px">
        <Box mb="20px">
          <Link to="/">
            <Sans>Home</Sans>
          </Link>
        </Box>
        <NavTree />
      </Box>
      <Box p={2}>
        <Serif size="8">{title}</Serif>
        <MDXRenderer>{code.body}</MDXRenderer>
      </Box>
    </Flex>
  )
}

/**
 * Query for data for the page. Note that $id is injected in via context from
 * actions.createPage. See gatsby-node.js for more info.
 */
export const pageQuery = graphql`
  query DocsLayoutQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`
