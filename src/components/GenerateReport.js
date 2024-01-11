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

    pdf.autoTable({
      head: [headers],
      body: data,
    });

    pdf.save("inventory.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default GenerateReport;
