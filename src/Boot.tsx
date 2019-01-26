import { MDXProvider } from "@mdx-js/tag"
import React from "react"
import { Provider as StateProvider } from "unstated"
import { LayoutComponents, Theme } from "./Theme"

// TODO: Need to create gatsby-plugin-react-head
// import { HeadProvider } from "react-head"

export const Boot: React.SFC<{ element: any }> = ({ element }) => {
  return (
    <StateProvider>
      <MDXProvider components={LayoutComponents}>
        <Theme>{element}</Theme>
      </MDXProvider>
    </StateProvider>
  )
}
