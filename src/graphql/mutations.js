/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBoardGame = /* GraphQL */ `
  mutation CreateBoardGame(
    $input: CreateBoardGameInput!
    $condition: ModelBoardGameConditionInput
  ) {
    createBoardGame(input: $input, condition: $condition) {
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
export const updateBoardGame = /* GraphQL */ `
  mutation UpdateBoardGame(
    $input: UpdateBoardGameInput!
    $condition: ModelBoardGameConditionInput
  ) {
    updateBoardGame(input: $input, condition: $condition) {
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
export const deleteBoardGame = /* GraphQL */ `
  mutation DeleteBoardGame(
    $input: DeleteBoardGameInput!
    $condition: ModelBoardGameConditionInput
  ) {
    deleteBoardGame(input: $input, condition: $condition) {
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
