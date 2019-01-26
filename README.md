# Barebones Gatsby Starter

- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components](https://www.styled-components.com/)
- [Rebass](https://github.com/rebassjs/rebass)
- [MDX](https://mdxjs.com/)
- [Jest](https://jestjs.io/)
- [NetlifyCMS](https://www.netlifycms.org/), with local file-system and MDX
  support
- [Lint Staged](https://github.com/okonet/lint-staged)
- [Prettier](https://prettier.io/)

Or, all the things I'd typically use.

### Development

```sh
yarn start
yarn clean
yarn type-check
```

### Deployment

```sh
yarn build
```

<details>
  <summary>Gatsby API Details</summary>

1.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage
    of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/)
    (if any). These allow customization/extension of default Gatsby settings
    affecting the browser.
1.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby
    site. This is where you can specify information about your site (metadata)
    like the site title and description, which Gatsby plugins you’d like to
    include, etc. (Check out the
    [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more
    detail).
1.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of
    the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any).
    These allow customization/extension of default Gatsby settings affecting
    pieces of the site build process.
1.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of
    the
    [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/)
    (if any). These allow customization of default Gatsby settings affecting
    server-side rendering.

</details>
