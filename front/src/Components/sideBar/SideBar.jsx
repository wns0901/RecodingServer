import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import VideocamIcon from "@mui/icons-material/Videocam";
import SettingsIcon from "@mui/icons-material/Settings";

// 사이드바의 너비를 상수로 정의하여 일관성 유지
const drawerWidth = 240;

const Sidebar = () => {
  const menuItems = [
    { text: "대시보드", icon: <HomeIcon />, path: "/" },
    { text: "녹화 목록", icon: <VideocamIcon />, path: "/recordings" },
    { text: "설정", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0, // 화면 크기가 줄어들 때 사이드바 너비가 줄어들지 않도록 설정
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e1e1e", // 다크 테마 배경색 (예시)
          color: "#ffffff", // 텍스트 색상
        },
      }}
      variant="permanent" // 항상 열려있는 영구적인 Drawer
      anchor="left" // 왼쪽에 위치
    >
      <List>
        {menuItems.map((item) => (
          // ListItemButton을 React Router의 Link 컴포넌트처럼 사용
          <ListItemButton
            key={item.text}
            component={Link} // 이 부분이 핵심! Link 컴포넌트로 렌더링
            to={item.path} // 클릭 시 이동할 경로
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
              "&.Mui-selected": {
                // 현재 선택된 경로일 때의 스타일
                backgroundColor: "rgba(255, 255, 255, 0.12)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#ffffff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
