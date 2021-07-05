import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Blog from "./Blog";

const App = () => {
  return (
    <BrowserRouter>
      <Blog />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;