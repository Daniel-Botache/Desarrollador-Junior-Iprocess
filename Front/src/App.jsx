import React from "react";
import Table from "./components/Table";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/user";

const App = () => {
  return (
    <div>
      <h1>User Table</h1>
      <Table />
    </div>
  );
};

export default App;
