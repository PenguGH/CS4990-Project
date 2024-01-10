/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBoardGame = /* GraphQL */ `
  query GetBoardGame($id: ID!) {
    getBoardGame(id: $id) {
      id
      name
      description
      quantity
      price
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listBoardGames = /* GraphQL */ `
  query ListBoardGames(
    $filter: ModelBoardGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBoardGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        quantity
        price
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
