import { HomeScreen } from "./components/HomeScreen";
import { SinglePlayer } from "./components/SinglePlayer";
import { useState } from "react";

import React from "react";

function App() {
  const [page, setPage] = useState("home");
  console.log("works");
  return (
    <React.Fragment>
      {page === "home" ? <HomeScreen setPage={setPage} /> : <SinglePlayer />}
    </React.Fragment>
  );
}

export default App;
