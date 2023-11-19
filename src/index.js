import React from "react";
//import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
//import store from './redux/store';
import store from "./store";
import "font-awesome/css/font-awesome.min.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </BrowserRouter>,
  document.getElementById("root")
);

/*
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </BrowserRouter>,
  document.getElementById("root")
);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={mainRouter} />)

*/
serviceWorker.unregister();
