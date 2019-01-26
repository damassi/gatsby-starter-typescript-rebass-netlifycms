// @ts-check

/**
 * Since this file is shared with NetlifyCMS it must be .jsx
 */

import React from "react"
import styled, { ThemeProvider } from "styled-components"

export const theme = {
  // TODO: https://rebassjs.org/theming
}

const H1 = styled.h1`
  font-size: 20px;
`

const P = styled.div`
  font-size: 16px;
`

export const LayoutComponents = {
  h1: H1,
  p: P,
}

export const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
