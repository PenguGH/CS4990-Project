import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/api";
import { Button, Flex, Heading, TextField, View } from "@aws-amplify/ui-react";
import { listBoardGames, getBoardGame } from "../graphql/queries";
import {
  createBoardGame as createBoardGameMutation,
  deleteBoardGame as deleteBoardGameMutation,
  updateBoardGame as updateBoardGameMutation,
} from "../graphql/mutations";

const client = generateClient();

const ManageInventory = () => {
  console.log("ManageInventory component rendered");

  const [boardGames, setBoardGames] = useState([]);
  const [editingBoardGame, setEditingBoardGame] = useState(null);
  const [totalNumberOfUniqueBoardGames, setTotalNumberOfUniqueBoardGames] = useState(0);
  const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
  const [totalCostOfBoardGames, setTotalCostOfBoardGames] = useState(0);

  useEffect(() => {
    fetchBoardGames();
  }, []);

  async function fetchBoardGames() {
    const apiData = await client.graphql({ query: listBoardGames });
    const boardGamesFromAPI = apiData.data.listBoardGames.items;
    setBoardGames(boardGamesFromAPI);

    // only counts the total # of unique board games in the inventory.
    // So you know how many different board games you have in stock.
    setTotalNumberOfUniqueBoardGames(boardGamesFromAPI.length);

    // calculates the total cost of all board games
    // by iterating through the board games array and is the summation of the resulting product
    // of each board game's quantity and price
    const calculateInventoryValue = boardGamesFromAPI.reduce(
      (accumulator, boardGame) => accumulator + boardGame.quantity * boardGame.price,
      0
    );

    setTotalCostOfBoardGames(calculateInventoryValue);

    // calculates the total # of all items in your inventory
    // so you know how many board games in total you have in stock to sell
    const calculateTotalNumberOfItems = boardGamesFromAPI.reduce(
      (acumulator, boardGame) => acumulator + boardGame.quantity, 
      0
    );

    setTotalNumberOfItems(calculateTotalNumberOfItems);

    return boardGamesFromAPI;
  }

  async function getBoardGameInfo(boardGameId) {
    const apiData = await client.graphql({
      query: getBoardGame,
      variables: { id: boardGameId },
    });

    const boardGameFromAPI = apiData.data.getBoardGame;
    return boardGameFromAPI;
  }

  // this is to create new board games
  async function submitBoardGame(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      id: form.get("id"),
      name: form.get("name"),
      description: form.get("description"),
      quantity: form.get("quantity"),
      price: form.get("price"),
    };

    if (editingBoardGame) {
      //update existing board game
      await updateBoardGame(data);
      setEditingBoardGame(null);
    } else {
      await client.graphql({
        query: createBoardGameMutation,
        variables: { input: data },
      });
    }
    fetchBoardGames();
    event.target.reset();
  }

  async function deleteBoardGame({ id }) {
    const newBoardGames = boardGames.filter((boardGame) => boardGame.id !== id);
    setBoardGames(newBoardGames);
    await client.graphql({
      query: deleteBoardGameMutation,
      variables: { input: { id } },
    });
  }

  async function updateBoardGame(updatedData) {
    await client.graphql({
      query: updateBoardGameMutation,
      variables: { input: updatedData },
    });
  }

  async function editBoardGame(id) {
    const boardGameInfo = await getBoardGameInfo(id);
    setEditingBoardGame(boardGameInfo.id); // Set the correct id for the board game
  }

  async function updateBoardGameField(id, field, value) {
    const updatedBoardGames = boardGames.map((boardGame) => {
      if (boardGame.id === id) {
        return { ...boardGame, [field]: value };
      }
      return boardGame;
    });

    setBoardGames(updatedBoardGames);
  }

  // save board games after editing works locally
  // async function saveBoardGame(id) {
  //   setEditingBoardGame(null);
  //   // Perform additional logic or API calls to save changes
  // }


  // save board games to amplify does not work
  async function saveBoardGame(id) {
    const editedBoardGame = boardGames.find((boardGame) => boardGame.id === id);
    // Perform additional logic or API calls to save changes
  
    // Perfrom an API call to update the board game on AWS Amplify server
    await updateBoardGame(editedBoardGame);
  
    // Reset editing state since you are done editing the board game.
    setEditingBoardGame(null);
  
    // Refetching the board games from the Amplify server to make sure the local state and remote state are the same.
    await fetchBoardGames();
  }


  return (
    <Flex direction="column" alignItems="center">
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
            name="quantity"
            placeholder="Quantity"
            label="Board Game Quantity"
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
            {editingBoardGame ? "Update Board Game" : "Create Board Game"}
          </Button>
        </Flex>
      </View>
      <Flex direction="column" alignItems="center">
        <Heading level={2}>Inventory Details | Total Cost: ${totalCostOfBoardGames.toFixed(2)}</Heading>
        <View margin="3rem 0">
          <table style={{ borderCollapse: "collapse", width: "80%" }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle}>Quantity</th>
                <th style={tableHeaderStyle}>Price</th>
                <th style={tableHeaderStyle}>Edit</th>
                <th style={tableHeaderStyle}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {boardGames.map((boardGame) => (
                <tr key={boardGame.id} style={tableRowStyle}>
                  <td style={tableCellStyle}>
                    {editingBoardGame === boardGame.id ? (
                      <input type="text" value={boardGame.id} readOnly />
                    ) : (
                      boardGame.id
                    )}
                  </td>
                  <td style={tableCellStyle}>
                    {editingBoardGame === boardGame.id ? (
                      <input
                        type="text"
                        value={boardGame.name}
                        onChange={(e) =>
                          updateBoardGameField(
                            boardGame.id,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      boardGame.name
                    )}
                  </td>
                  <td style={tableCellStyle}>
                    {editingBoardGame === boardGame.id ? (
                      <input
                        type="text"
                        value={boardGame.description}
                        onChange={(e) =>
                          updateBoardGameField(
                            boardGame.id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      boardGame.description
                    )}
                  </td>
                  <td style={tableCellStyle}>
                    {editingBoardGame === boardGame.id ? (
                      <input
                        type="number"
                        value={boardGame.quantity}
                        onChange={(e) =>
                          updateBoardGameField(
                            boardGame.id,
                            "quantity",
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                    ) : (
                      boardGame.quantity
                    )}
                  </td>
                  <td style={tableCellStyle}>
                    {editingBoardGame === boardGame.id ? (
                      <input
                        type="number"
                        value={boardGame.price}
                        onChange={(e) =>
                          updateBoardGameField(
                            boardGame.id,
                            "price",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    ) : (
                      boardGame.price
                    )}
                  </td>
                  <td style={tableCellStyle}>
                    {editingBoardGame === boardGame.id ? (
                      <Button
                        variation="link"
                        onClick={() => saveBoardGame(boardGame.id)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variation="link"
                        onClick={() => editBoardGame(boardGame.id)}
                      >
                        Edit
                      </Button>
                    )}
                  </td>
                  <td style={tableCellStyle}>
                    <Button
                      variation="link"
                      onClick={() => deleteBoardGame(boardGame)}
                    >
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Total Number of Unique Board Games: {totalNumberOfUniqueBoardGames}</h2>
          <h2>Total Number of Items: {totalNumberOfItems}</h2>
        </View>
      </Flex>
    </Flex>
  );
};

const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  background: "#f2f2f2",
};

const tableRowStyle = {
  border: "1px solid #ddd",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

export default ManageInventory;
