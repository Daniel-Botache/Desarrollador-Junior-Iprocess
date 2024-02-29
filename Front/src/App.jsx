import React from "react";
import { SnackbarProvider } from "notistack";
import Table from "./components/Table/Table";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <Table />
      </div>
    </SnackbarProvider>
  );
};

export default App;
