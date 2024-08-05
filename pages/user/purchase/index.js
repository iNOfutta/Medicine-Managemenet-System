import classes from "./purchase.module.css";
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
import { columns } from "../../../Components/DataTabel/Purchase/Column";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../../../firebase/Context/AuthContext";
import Link from "next/link";
import { GridAddIcon } from "@mui/x-data-grid";

const Sales = () => {
  const router = useRouter();
  const [medicineData, setMedicineData] = useState([]);
  const { state, dispatch } = useContext(StateContext);
  const { currentUser } = useAuth();

  useEffect(() => {
    axios.post("/api/Medicine/fetch", { uid: currentUser._id }).then((res) => {
      const fetch_data = res.data.history;
      const updatedData = fetch_data.filter(
        (medicine) => medicine.type === "add"
      );
      const userNames = [
        "Alice Vumba",
        "Joaquina Luís",
        "Mafuta Charlie",
        "Dave William",
        "Eva Jota",
        "Garvia Frank",
        "Admin",
      ]; // Example user names
      const userAdded = updatedData.map((medicine, index) => ({
        ...medicine,
        userName: userNames[index % userNames.length], // Cycle through userNames array
      }));
      setMedicineData(userAdded);
    });
  }, [currentUser._id]);

  return (
    <>
      <Head>
        <title>HRL | Abastecimento</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Navbar title="Abastecimento" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Button
            startIcon={<GridAddIcon />}
            fullWidth
            variant="contained"
            color="primary"
            style={{
              maxWidth: "400px",
              marginBottom: "20px",
              backgroundColor: "#4caf50",
              color: "#fff",
              borderRadius: "8px",
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: "16px",
              "&:hover": { backgroundColor: "#45a049" },
            }}
            onClick={() => router.replace("/user/purchase-medicine")}
          >
            Adicionar
          </Button>
          {medicineData.length ? (
            <DataTable
              data={medicineData.map((medicine) => ({
                ...medicine,
                updateon: new Date(medicine.updateon).toLocaleString("en-US", {
                  timeZone: "Africa/Luanda",
                  hour12: false,
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }),
              }))}
              col={columns}
            />
          ) : (
            <div style={{ textAlign: "center", color: "#888" }}>
              <h2 style={{ opacity: 0.6 }}>
                Você ainda não adicionou nenhum medicamento.
              </h2>
              <p style={{ opacity: 0.6, fontWeight: 500 }}>
                Clique aqui para adicionar medicamento -{" "}
                <Link
                  href="/user/purchase-medicine"
                  style={{ color: "#1e88e5", textDecoration: "underline" }}
                >
                  Adicionar remédio
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
      <SnackbarTag
        open={state.isPopUpOpen}
        msg={state.popupMsg}
        type={state.popupType}
        close={(reason) => {
          if (reason === "clickaway") return;
          dispatch({ type: "close popup" });
        }}
      />
    </>
  );
};

export default Sales;
