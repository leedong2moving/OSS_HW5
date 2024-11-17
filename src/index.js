import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import ShowList from "./components/ShowList";

const myComponent = <ShowList />;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(myComponent);
