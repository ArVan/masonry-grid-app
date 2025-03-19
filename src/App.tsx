import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter basename="/masonry-grid-app">
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
