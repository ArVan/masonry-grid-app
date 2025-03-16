import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import PhotoDetails from "@/pages/PhotoDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/photo/:id" element={<PhotoDetails />} />
    </Routes>
  );
};

export default AppRoutes;
