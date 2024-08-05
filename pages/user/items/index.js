import classes from "./items.module.css";
import Navbar from "../../../Components/subNavbar/navbar";
import Head from "next/head";
import DataTable from "../../../Components/DataTabel/DataTabel";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../../Context/StateContext";
import SnackbarTag from "../../../Components/Snackbar/Snackbar";
import { columns } from "../../../Components/DataTabel/Items/Column";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../../firebase/Context/AuthContext";
import Link from "next/link";

const Items = () => {
  const router = useRouter();
  const [medicineData, setMedicineData] = useState([]);
  const { state, dispatch } = useContext(StateContext);
  const { currentUser } = useAuth();

  useEffect(() => {
    axios.post("/api/Medicine/fetch", { uid: currentUser._id }).then((res) => {
      const userNames = [
        "Alice Vumba",
        "Joaquina Luís",
        "Mafuta Charlie",
        "Dave William",
        "Eva Jota",
        "Garvia Frank",
        "Admin",
      ]; // Example user names
      const updatedData = res.data.stock;
      const userAdded = updatedData?.length
        ? updatedData.map((medicine, index) => ({
            ...medicine,
            userName: userNames[index % userNames.length], // Cycle through userNames array
          }))
        : [];
      setMedicineData(userAdded);
    });
  }, [currentUser._id]);

  console.log("Data: ", medicineData);

  return (
    <>
      <Head>
        <title>HRL | Remoção</title>
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
        <Navbar title="Remoção" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <Button
              startIcon={<DeleteIcon />}
              fullWidth
              variant="contained"
              color="error"
              onClick={() => router.replace("/user/remove-medicine")}
              style={{
                maxWidth: "400px",
                backgroundColor: "#d32f2f",
                color: "#fff",
                borderRadius: "8px",
                textTransform: "capitalize",
                fontWeight: "bold",
                fontSize: "16px",
                "&:hover": { backgroundColor: "#e53935" },
              }}
            >
              Remover
            </Button>
          </div>
          {medicineData.length !== 0 ? (
            <DataTable
              data={medicineData.map((medicine) => ({
                ...medicine,
                expiryDate: new Date(medicine.expiryDate).toLocaleString(
                  "en-US",
                  {
                    timeZone: "Africa/Luanda",
                    hour12: false,
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }
                ),
                uploadOn: new Date(medicine.uploadOn).toLocaleString("en-US", {
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
                Você ainda não removou nenhum medicamento.
              </h2>
              <p style={{ opacity: 0.6, fontWeight: 500 }}>
                Clique aqui para remover medicamentos -{" "}
                <Link
                  href="/user/purchase-medicine"
                  style={{ color: "#1e88e5", textDecoration: "underline" }}
                >
                  Remover remédio
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

export default Items;
