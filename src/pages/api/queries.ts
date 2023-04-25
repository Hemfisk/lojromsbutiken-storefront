export const GET_SHOP_NAME = `
  query {
    shop {
      name
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
