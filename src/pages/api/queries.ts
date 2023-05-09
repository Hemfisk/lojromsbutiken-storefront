export const GET_SHOP_NAME = `
  query {
    shop {
      name
    }
  }
`

export const GET_PAYMENT_METHODS = `
  query {
    shop {
      paymentSettings {
        acceptedCardBrands
        supportedDigitalWallets
      }
    }
  }
`

export const GET_PAGE_CONTENT = `
query getPageByHandle($handle: String!) {
  page(handle: $handle) {
    id
    title
    body
  }
}
`

export const GET_COLLECTIONS = `
query getCollections ($amount: Int) {
  collections(first: $amount) {
    edges {
      node {
        id
        handle
        title
      }
    }
  }
}
`

export const GET_PRODUCTS = `
query getProducts ($amount: Int!, $cursor: String) {
  products(first: $amount, after: $cursor) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      cursor
      node {
        handle
        title
        images(first: 1) {
          edges {
            node {
              transformedSrc
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              weight
              weightUnit
            }
          }
        }
        addonType: metafield(namespace: "addon", key: "type") {
          value
          key
        }
        addonText: metafield(namespace: "addon", key: "text") {
          value
          key
        }
        collections(first: 1) {
          nodes{
            handle
            title
          }
        }
      }
    }
  }
}
`
