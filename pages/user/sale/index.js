import classes from "./sale.module.css";
import Navbar from "../../../Components/subNavbar/navbar";
import Head from "next/head";
import DataTable from "../../../Components/DataTabel/DataTabel";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { auth } from "../../../firebase/firebase";
import { StateContext } from "../../../Context/StateContext";
import SnackbarTag from "../../../Components/Snackbar/Snackbar";
import { columns_sale } from "../../../Components/DataTabel/Sales/Column";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useAuth } from "../../../firebase/Context/AuthContext";
import Link from "next/link";

const Sales = () => {
  const router = useRouter();
  const [medicineData, setMedicineData] = useState([]);
  const { state, dispatch } = useContext(StateContext);
  const { currentUser } = useAuth();

  useEffect(() => {
    axios.post("/api/Medicine/fetch", { uid: currentUser._id }).then((res) => {
      setMedicineData(res.data.sales);
    });
  }, []);

  return (
    <>
      <Head>
        <title>HRL | Remoção</title>
      </Head>
      <div className={classes.main_container}>
        <Navbar title="Remoção" />
        <div className={classes.dataTabelContainer}>
          <div className={classes.input_container}>
            <div className={classes.btn}>
              {
                <Button
                  startIcon={<RemoveCircleIcon />}
                  fullWidth={true}
                  variant="contained"
                  color="error"
                  onClick={() => router.replace("/user/sale-medicine")}
                >
                  Remover
                </Button>
              }
            </div>
          </div>
          {medicineData.length !== 0 ? (
            <DataTable data={medicineData} col={columns_sale} />
          ) : (
            <>
              <h2 style={{ opacity: ".5" }}>
                Você ainda não removeu nenhum medicamento do stock.
              </h2>
              <span style={{ opacity: ".5", fontWeight: "500" }}>
                Clique aqui para remover remédios do stock -{" "}
                <Link href="/user/sale-medicine" style={{ color: "blue" }}>
                  Remover remédios
                </Link>
              </span>
            </>
          )}
        </div>
      </div>
      <SnackbarTag
        open={state.isPopUpOpen}
        msg={state.popupMsg}
        type={state.popupType}
        close={(reason) => {
          if (reason === "clickaway") {
            return;
          }
          dispatch({ type: "close popup" });
        }}
      />
    </>
  );
};
export default Sales;
