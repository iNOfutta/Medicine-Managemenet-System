import classes from "./history.module.css";
import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Navbar from "../../../Components/subNavbar/navbar";
import axios from "axios";
import HistoryTable from "../../../Components/HistoryTable/HistoryTable";
import { StateContext } from "../../../Context/StateContext";
import { useAuth } from "../../../firebase/Context/AuthContext";

function History() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(StateContext);
  const { currentUser } = useAuth();

  useEffect(() => {
    axios.post("/api/Medicine/fetch", { uid: currentUser._id }).then((res) => {
      const { history } = res.data;
      const userNames = [
        "Alice Vumba",
        "Joaquina Luís",
        "Mafuta Charlie",
        "Dave William",
        "Eva Jota",
        "Garvia Frank",
        "Admin",
      ]; // Example user names
      const userAdded = history.map((medicine, index) => ({
        ...medicine,
        userName: userNames[index % userNames.length], // Cycle through userNames array
      }));
      setData(userAdded);
      dispatch({ type: "reset history badger" });
    });
  }, [currentUser._id, dispatch]);

  return (
    <>
      <Head>
        <title>HRL | Histórico</title>
      </Head>
      <Navbar title="Histórico" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
            padding: "16px", // Add padding for consistent spacing
          }}
        >
          {data.length !== 0 ? (
            <HistoryTable
              rows={data.map((medicine) => ({
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
            />
          ) : (
            <div style={{ textAlign: "center", color: "#888" }}>
              <h2 style={{ opacity: 0.6 }}>Nenhum histórico registrado.</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default History;
