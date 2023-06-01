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

const productContent = `
handle
title
descriptionHtml
images(first: 4) {
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
compareAtPriceRange {
  minVariantPrice {
    amount
  }
}
variants(first: 10) {
  edges {
    node {
      id
      weight
      weightUnit
      price {
        amount
      }
      compareAtPrice {
        amount
      }
    }
  }
}
addonType: metafield(namespace: "addon", key: "type") {
  value
}
addonText: metafield(namespace: "addon", key: "text") {
  value
}
infoTillstand: metafield(namespace: "info", key: "tillstand") {
  value
}
infoTillagning: metafield(namespace: "info", key: "tillagning") {
  value
}
infoHallbarhet: metafield(namespace: "info", key: "hallbarhet") {
  value
}
infoStorlek: metafield(namespace: "info", key: "storlek") {
  value
}
infoFangst: metafield(namespace: "info", key: "fangst") {
  value
}
infoLatin: metafield(namespace: "info", key: "latin") {
  value
}
collections(first: 1) {
  nodes{
    handle
    title
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
        ${productContent}
      }
    }
  }
}
`

const recipeContent = `
handle
title
excerpt
contentHtml
image {
  transformedSrc
}
ingredients: metafield(namespace: "recept", key: "ingredients") {
  value
  key
}
products: metafield(namespace: "recept", key: "products") {
  value
  key
}
`

export const GET_RECIPES = `
query getRecipes ($amount: Int!, $cursor: String) {
  articles(first: $amount, after: $cursor) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      cursor
      node {
        ${recipeContent}
      }
    }
  }
}
`

export const GET_RECIPE = `
query getRecipe ($handle: String!) {
  blog(handle: "recept") {
    articleByHandle(handle: $handle) {
      ${recipeContent}
    }
  }
}
`

export const GET_PRODUCT = `
query getProduct ($handle: String!) {
  productByHandle(handle: $handle) {
    ${productContent}
  }
}
`
