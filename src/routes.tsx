import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import { lazy, Suspense } from "react";
import { StyledLoader, StyledLoaderContainer } from "./styles/LoaderStyles";

const PhotoDetails = lazy(() => import("@/pages/PhotoDetails"));

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
    </Routes>
  );
};

export default AppRoutes;

const LoadingIndicator = () => (
  <StyledLoaderContainer>
    <StyledLoader />
  </StyledLoaderContainer>
);
