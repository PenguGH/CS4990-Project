import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { listBoardGames } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

const GenerateReport = () => {
  async function fetchBoardGames() {
    const apiData = await client.graphql({ query: listBoardGames });
    const boardGamesFromAPI = apiData.data.listBoardGames.items;
    return boardGamesFromAPI;
  }

  const generatePDF = async () => {
    const boardGames = await fetchBoardGames();

    const pdf = new jsPDF();

    const headers = ["ID", "Name", "Description", "Quantity", "Price"];

    const data = boardGames.map((boardGame) => [
      boardGame.id,
      boardGame.name,
      boardGame.description,
      boardGame.quantity,
      boardGame.price,
    ]);

    const totalValue = boardGames.reduce((total, boardGame) => {
      return total + boardGame.quantity * boardGame.price;
    }, 0);

    const totalRow = ["Total Value", "", "", "", totalValue.toFixed(2)];
    data.push(totalRow);

    const totalItems = boardGames.reduce((total, boardGame) => {
      return total + boardGame.quantity;
    }, 0);

    const totalUniqueGames = new Set(
      boardGames.map((boardGame) => boardGame.id)
    ).size;

    const additionalInfo = [
      ["Total Number of Items", totalItems, "", "", ""],
      ["Total Number of Unique Board Games", totalUniqueGames, "", "", ""],
    ];

    pdf.autoTable({
      head: [headers],
      body: data,
    });

    pdf.autoTable({
      body: additionalInfo,
      startY: pdf.autoTable.previous.finalY + 10,
    });

    pdf.save("inventory.pdf");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default GenerateReport;
