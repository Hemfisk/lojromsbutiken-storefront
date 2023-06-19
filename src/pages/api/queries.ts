export const GET_SHOP_NAME = `
  query {
    shop {
      name
    }
  }
`

export const GET_POLICY = `
  query {
    shop {
      privacyPolicy {
        body
      }
      refundPolicy {
        body
      }
      shippingPolicy {
        body
      }
      subscriptionPolicy {
        body
      }
      termsOfService {
        body
      }
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
variants(first: 10) {
  edges {
    node {
      id
      title
      weight
      weightUnit
      price {
        amount
      }
      compareAtPrice {
        amount
      }
      description: metafield(namespace: "variant", key: "description") {
        value
      }
      amount: metafield(namespace: "variant", key: "antal") {
        value
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
certProduct: metafield(namespace: "certs", key: "product_logo") {
  value
}
certASC: metafield(namespace: "certs", key: "asc") {
  value
}
certKrav: metafield(namespace: "certs", key: "krav") {
  value
}
certMSC: metafield(namespace: "certs", key: "msc") {
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

export const GET_PRODUCT_BY_ID = `
query getProductById ($id: ID!) {
  product(id: $id) {
    ${productContent}
  }
}
`

const cartDetails = `
id
createdAt
updatedAt
totalQuantity
buyerIdentity {
  countryCode
}
# The estimated total cost of all merchandise that the customer will pay at checkout.
cost {
  totalAmount {
    amount
  }
  # The estimated amount, before taxes and discounts, for the customer to pay at checkout.
  subtotalAmount {
    amount
  }
  # The estimated tax amount for the customer to pay at checkout.
  totalTaxAmount {
    amount
  }
}
`

export const CREATE_CART = `
mutation createCart ($id: ID!) {
  cartCreate(
    input: {
      buyerIdentity: {
        countryCode: SE
      }
      lines: [
        {
          quantity: 1
          merchandiseId: $id
        }
      ],
    }
  ) {
    cart {
      ${cartDetails}
    }
  }
}
`

export const ADD_TO_CART = `
mutation addToCart ($cartId: ID!, $id: ID!) {
  cartLinesAdd(
    cartId: $cartId
    lines: {
      quantity: 1 
      merchandiseId: $id
    }
  ) {
    cart {
      ${cartDetails}
    }
  }
}
`

export const UPDATE_CART_ITEM = `
mutation updateCartItem ($cartId: ID!, $id: ID!, $quantity: Int) {
  cartLinesUpdate(
    cartId: $cartId
    lines: {
      quantity: $quantity 
      id: $id
    }
  ) {
    cart {
      ${cartDetails}
    }
  }
}
`

export const REMOVE_CART_ITEM = `
mutation removeCartItem ($cartId: ID!, $id: ID!) {
  cartLinesRemove(
    cartId: $cartId
    lineIds: [$id]
  ) {
    cart {
      ${cartDetails}
    }
  }
}
`

export const GET_CART = `
query getCart ($cartId: ID!) {
  cart(id: $cartId) {
    ${cartDetails}
  }
}
`
export const GET_CART_ITEMS = `
query getCart ($cartId: ID!, $amount: Int!, $cursor: String) {
  cart(id: $cartId) {
    lines(first: $amount, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              weight
              weightUnit
              price {
                amount
              }
              compareAtPrice {
                amount
              }
              description: metafield(namespace: "variant", key: "description") {
                value
              }
              amount: metafield(namespace: "variant", key: "antal") {
                value
              }
              product {
                ${productContent}
              }
            }
          }
        }
      }
    }
  }
}
`

export const GET_CHECKOUT_URL = `
query getCheckoutUrl ($id: ID!) {
  cart(id: $id) {
    checkoutUrl
  }
}
`
