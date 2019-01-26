import styled from "styled-components"

interface Typography {
  size?: string
}

export const Sans = styled.div<Typography>`
  font-family: arial;
`

export const Serif = styled.div<Typography>`
  font-family: "Times New Roman", Times, serif;
`
