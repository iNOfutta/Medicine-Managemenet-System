import classes from "./navbar.module.css";
import { useAuth } from "../../firebase/Context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "../Loading/Loading";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import { IconButton } from "@mui/material/";
import { auth } from "../../firebase/firebase";

export default function Navbar({ title, badger }) {
  const { logout, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      {!loading && (
        <nav className={classes.nav}>
          <h2 className={classes.title}>{title}</h2>
          <ul className={classes.navList}>
            <li>
              Bem-vindo(a), <span>{currentUser && currentUser.userName}</span>
            </li>
            <li>
              <IconButton
                className={classes.iconButton}
                onClick={async () => {
                  setLoading(true);
                  await router.push("/user/history");
                  setLoading(false);
                }}
              >
                <HistoryIcon />
              </IconButton>
            </li>
            <li>
              <IconButton
                className={classes.iconButton}
                onClick={async () => {
                  setLoading(true);
                  await logout();
                  router.push("/login");
                  setLoading(false);
                }}
              >
                <LogoutIcon />
              </IconButton>
            </li>
          </ul>
        </nav>
      )}
      {loading && <Loading />}
    </>
  );
}
