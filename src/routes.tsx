import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import { lazy, Suspense } from "react";
import { StyledLoader, StyledLoaderContainer } from "./styles/LoaderStyles";

const PhotoDetails = lazy(() => import("@/pages/PhotoDetails"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/photo/:id"
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <PhotoDetails />
          </Suspense>
        }
      />
      {/* Catch-all route for 404 errors */}
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

const LoadingIndicator = () => (
  <StyledLoaderContainer>
    <StyledLoader />
  </StyledLoaderContainer>
);
