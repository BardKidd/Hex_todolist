import { createRoot } from "react-dom/client";
import App from "./App";
import "@/assets/css/tailwind.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, history } from "./store";
import * as React from "react";
import FullPageSpin from "./components/Spin";
import "antd/dist/antd.css";

// ===============================================================
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <HashRouter>
      <React.Suspense fallback={<FullPageSpin />}>
        <FullPageSpin />
        <App />
      </React.Suspense>
    </HashRouter>
  </Provider>
);
