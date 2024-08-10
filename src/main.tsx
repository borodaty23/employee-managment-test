import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@/app/store";
import App from "./app/App";
import "./shared/styles/index.scss";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
