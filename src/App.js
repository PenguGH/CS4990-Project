import React from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header.js";
import ManageInventory from "./components/ManageInventory.js";
import GenerateReport from "./components/GenerateReport.js";
import Archives from "./components/Archives.js";

const App = ({ signOut }) => {
  return (
    <>
      <>
        <Router>
          <Header />
          <Routes>
            <Route path="/manage-inventory" element={<ManageInventory />} />
            <Route path="/generate-report" element={<GenerateReport />} />
            <Route path="/archives" element={<ManageInventory />} />
          </Routes>
        </Router>
      </>
      <View className="App">
        <div>
          <h1>Hello</h1>
        </div>
        <div></div>
        <Button onClick={signOut}>Sign Out</Button>
      </View>
    </>
  );
};

export default withAuthenticator(App);
