import { BrowserRouter, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import { createRoot } from "react-dom/client";
import DashBoardPage from "./Page/DashBoardPage";
import Sidebar from "./Components/SideBar";
import RecodingsPage from "./Page/RecodingsPage";
import SettingPage from "./Page/SettingPage";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main">
        <Routes>
          <Route path="/" Component={DashBoardPage} />
          <Route path="/recordings" Component={RecodingsPage} />
          <Route path="/settings" Component={SettingPage} />
        </Routes>
      </Box>
    </Box>
  </BrowserRouter>
);
