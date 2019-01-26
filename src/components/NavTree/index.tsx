import { Sans, Serif } from "components/ui/Typography"
import { Link } from "gatsby"
import React from "react"
import { Box } from "rebass"
import styled from "styled-components"
import { NavTree } from "./NavTree"

export const Sidebar = _props => {
  return (
    <Container pl={2} pt={2}>
      <Link to="/">
        <Serif size="4">Home</Serif>
      </Link>

      <Box mt={2} mb={4}>
        <NavTree />
      </Box>

      <Box>
        <Sans size="1" color="black60">
          Updated: Sept 3, 2018
        </Sans>
      </Box>
    </Container>
  )
}

const Container = styled(Box)`
  border-right: 1px solid black;
  flex: 0 0 200px;
`
