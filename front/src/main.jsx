import { BrowserRouter, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import { createRoot } from "react-dom/client";
import DashBoardPage from "./Page/DashBoardPage";
import Sidebar from "./Components/sideBar/SideBar";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Routes>
          <Route path="/" Component={DashBoardPage}></Route>
        </Routes>
      </Box>
    </Box>
  </BrowserRouter>
);
