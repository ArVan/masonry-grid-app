import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import AppRoutes from "./routes";
import { GlobalStyles } from "./styles/GlobalStyles";
import ErrorComponent from "./components/ErrorComponent";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter basename="/masonry-grid-app">
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorComponent
              title="Something Went Wrong"
              message="An unexpected error occurred in the application. Please try refreshing the page or returning to the home page."
              buttonAction={resetErrorBoundary}
              buttonText="Retry..."
            />
          )}
        >
          <AppRoutes />
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
