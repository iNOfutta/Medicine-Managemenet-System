import classes from "./user.module.css";
import Navbar from "../../Components/subNavbar/navbar";
import Head from "next/head";
import { useAuth } from "../../firebase/Context/AuthContext";
import Widget from "../../Components/Widget/Widget";
import Feature from "../../Components/Feature/Feature";
import Chart from "../../Components/Chart/Chart";
import { StateContext } from "../../Context/StateContext";
import { useContext, useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material/";
import StorefrontIcon from "@mui/icons-material/Storefront";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useRouter } from "next/router";
import axios from "axios";
import { AddCircleOutline } from "@mui/icons-material";

export default function User() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { state } = useContext(StateContext);
  const [fetchData, setFetchData] = useState({
    purchase: 0,
    sale: 0,
  });

  useEffect(() => {
    axios.post("/api/Medicine/fetch", { uid: currentUser._id }).then((res) => {
      const { totalPurchase, totalSale } = res.data;
      setFetchData({ purchase: totalPurchase, sale: totalSale });
    });
  }, [currentUser]);

  return (
    <>
      <Head>
        {currentUser && <title>HRL | Dashboard | {currentUser.userName}</title>}
      </Head>
      <div className={classes.main_container}>
        <Navbar title="Dashboard" badger={state.badger_history} />
        <div className={classes.widgets}>
          <div className={classes.btn_container}>
            <div className={classes.btn_sub_container}>
              <IconButton
                title="Abastecimento de Medicamento"
                className={classes.iconButton}
                onClick={async () => {
                  await router.push("/user/purchase-medicine");
                }}
              >
                <AddCircleOutline className={classes.icon} />
              </IconButton>
              <span className={classes.btn_text}>
                Abastecimento de Medicamento
              </span>
            </div>

            <div className={classes.btn_sub_container}>
              <IconButton
                title="Farmacêuticos"
                className={classes.iconButton}
                onClick={async () => {
                  await router.push("/user/items");
                }}
              >
                <StorefrontIcon className={classes.icon} />
              </IconButton>
              <span className={classes.btn_text}>Farmacêuticos</span>
            </div>

            <div className={classes.btn_sub_container}>
              <IconButton
                title="Remoção de Medicamento"
                className={classes.iconButton}
                onClick={async () => {
                  await router.push("/user/remove-medicine");
                }}
              >
                <RemoveCircleIcon className={classes.icon} />
              </IconButton>
              <span className={classes.btn_text}>Remoção de Medicamento</span>
            </div>
          </div>
          <Widget type="purchase" amount={fetchData.purchase} />
          <Widget type="sales" amount={fetchData.sale} />
        </div>
        <div className={classes.charts}>
          <Feature />
          <Chart />
        </div>
      </div>
    </>
  );
}
