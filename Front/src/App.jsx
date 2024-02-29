import React from "react";
import { SnackbarProvider } from "notistack";
import Table from "./components/Table";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <h1>My App</h1>
        <Table />
      </div>
    </SnackbarProvider>
  );
};

export default App;
