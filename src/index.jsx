import { createRoot } from "react-dom/client";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import { MainView } from "../components/main-view/main-view";

// Main component (will eventually use all the others)
const App = () => {
  return <MainView />;
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);