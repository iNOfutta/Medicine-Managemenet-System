import Image from "next/image";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function HNavbar() {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#0D1427", padding: "0 20px" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/" passHref>
          <Box component="a" sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/HRL-LOGO-ALTERNATIVO.png"
              width={350}
              height={80}
              alt="HRL Logo"
              priority="high"
              style={{ cursor: "pointer", margin: 15 }}
            />
          </Box>
        </Link>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <List sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <ListItem button component={Link} href="/login">
              <ListItemText primary="Entrar" />
            </ListItem>
            {/* Uncomment and modify the ListItem below to enable signup link */}
            {/* <ListItem button component={Link} href="/signup">
              <ListItemText primary="Registar-se" />
            </ListItem> */}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
