import React from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header.js";
import ManageInventory from "./components/ManageInventory.js";
import GenerateReport from "./components/GenerateReport.js";
import boardgames from "./images/boardgames.jpg";

const App = ({ signOut }) => {
  return (
    <>
      <>
        <Router>
          <Header />
          <Routes>
            <Route path="/manage-inventory" element={<ManageInventory />} />
            <Route path="/generate-report" element={<GenerateReport />} />
          </Routes>
        </Router>
      </>
      <Router>
        <View className="App">
          <div>
            <h1>Hello, start managing your board game inventory today!</h1>
            <img src={boardgames} alt="" />
          </div>
          <div></div>
          <Button onClick={signOut}>Sign Out</Button>
        </View>
      </Router>
    </>
  );
};

export default withAuthenticator(App);
