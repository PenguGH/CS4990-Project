import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/api";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listBoardGames, getBoardGame } from "./graphql/queries";
import {
  createBoardGame as createBoardGameMutation,
  deleteBoardGame as deleteBoardGameMutation,
} from "./graphql/mutations";

const client = generateClient();

const App = ({ signOut }) => {
  const [boardGames, setBoardGames] = useState([]);

  useEffect(() => {
    fetchBoardGames();
  }, []);

  async function fetchBoardGames() {
    const apiData = await client.graphql({ query: listBoardGames });
    const boardGamesFromAPI = apiData.data.listBoardGames.items;
    setBoardGames(boardGamesFromAPI);
  }

  // this is to create new board games
  async function submitBoardGame(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      id: form.get("id"),
      name: form.get("name"),
      description: form.get("description"),
      price: form.get("price"),
    };
    await client.graphql({
      query: createBoardGameMutation,
      variables: { input: data },
    });
    fetchBoardGames();
    event.target.reset();
  }

  async function deleteBoardGame({ id }) {
    const newBoardGames = boardGames.filter(
      (boardGame) => boardGame.id !== id
    );
    setBoardGames(newBoardGames);
    await client.graphql({
      query: deleteBoardGameMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <Heading level={1}>Board Game Tracker</Heading>
      <View as="form" margin="3rem 0" onSubmit={submitBoardGame}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="id"
            placeholder="id"
            label="Board Game id"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="name"
            placeholder="Name"
            label="Board Game Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Description"
            label="Board Game Description"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="price"
            placeholder="Price"
            label="Board Game Price"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Board Game
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Inventory Details</Heading>
      <View margin="3rem 0">
        {boardGames.map((boardGame) => (
          <Flex
            key={
              boardGame.id ||
              boardGame.name ||
              boardGame.description ||
              boardGame.price
            }
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {boardGame.id}
            </Text>
            <Text as="span">{boardGame.name}</Text>
            <Text as="span">{boardGame.description}</Text>
            <Text as="span">{boardGame.price}</Text>
            <Button
              variation="link"
              onClick={() => deleteBoardGame(boardGame)}
            >
              Delete Board Game
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);