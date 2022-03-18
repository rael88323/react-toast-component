import React from "react";
import ReactDOM from "react-dom";

import { ToastConsumer, ToastProvider } from "./toast-manager";

import "./styles.css";

function Demo() {
  return (
    <ToastConsumer>
      {({ add }) => (
        <button onClick={() => add("Click to dismiss!")}>Add toast</button>
      )}
    </ToastConsumer>
  );
}

function App() {
  return (
    <div className="App">
      <ToastProvider>
        <h2>React Toast Notifications</h2>
        <p>
          From the medium article{" "}
          <a href="https://medium.com/@jossmac/64f819d63eab">
            "A deep-ish dive into React Context"
          </a>
        </p>
        <p>
          <Demo />
        </p>
      </ToastProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
