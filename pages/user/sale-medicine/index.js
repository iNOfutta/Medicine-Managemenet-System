import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../../Components/subNavbar/navbar";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import NavigationBar from "../../../Components/SideLayout/Navigation/NavigationBar";
import axios from "axios";
import { useRouter } from "next/router";
import { auth } from "../../../firebase/firebase";
import { StateContext } from "../../../Context/StateContext";
import AlertDialog from "../../../Components/AlertDialog/AlertDialog";
import Head from "next/head";
import { useAuth } from "../../../firebase/Context/AuthContext";

const AddItem = () => {
  const { state, dispatch } = useContext(StateContext);
  const { currentUser } = useAuth();

  const [medicineData, setMedicineData] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(true);
  const [quantity, setQuantity] = useState("");
  const [emergency, setEmergency] = useState(false);

  const router = useRouter();

  useEffect(() => {
    axios.post("/api/Medicine/fetch", { uid: currentUser._id }).then((res) => {
      setMedicineData(res.data.stock);
    });
  }, []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const closeAlert = () => {
    dispatch({ type: "close alert" });
    setValue(null);
    setInputValue("");
    setQuantity(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    if (!checked && parseInt(quantity) > value.quantity) {
      dispatch({
        type: "open alert",
        payload: {
          title: "Entrada inválida...",
          msg: "A quantidade inserida é maior que a quantidade disponível...",
        },
      });
      return;
    }

    if (!checked && parseInt(quantity) === value.quantity) {
      dispatch({
        type: "open alert",
        payload: {
          title: "Alerta",
          msg: "Você deseja remover toda a quantidade presente?",
        },
      });
      setEmergency(true);
    }

    if (!checked && !quantity) {
      dispatch({
        type: "open alert",
        payload: {
          title: "Entrada inválida...",
          msg: "Por favor, insira a quantidade primeiro e depois continue!",
        },
      });
      return;
    }

    const endpoint = `/api/Medicine/${
      !emergency ? `${checked ? "whole_sale" : "partial_sale"}` : "whole_sale"
    }`;
    const requestBody = checked
      ? {
          uid: currentUser._id,
          ...value,
          type: "sale",
          date: currentDate,
        }
      : {
          uid: currentUser._id,
          ...value,
          remove_quantity: quantity,
          type: "sale",
          date: currentDate,
        };

    axios
      .post(endpoint, requestBody)
      .then((res) => {
        dispatch({
          type: "open popup",
          payload: {
            msg: res.data.msg,
            type: "success",
          },
        });
        setEmergency(false);
        router.replace("/user/sale");
      })
      .catch((err) => {
        dispatch({
          type: "open popup",
          payload: {
            msg: err,
            type: "error",
          },
        });
      });
  };

  if (state.isAlertOpen) {
    return (
      <AlertDialog
        info={state.alertMsg}
        open={state.isAlertOpen}
        title={state.alertTitle}
        handleClose={closeAlert}
      />
    );
  }

  return (
    <>
      <Head>
        <title>HRL | Remoção de Medicamentos</title>
      </Head>
      <Navbar title="Remoção de Medicamentos" />
      <NavigationBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            width: "100%",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <Autocomplete
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            id="controllable-states-demo"
            options={medicineData}
            getOptionLabel={(medicineData) => medicineData.name}
            sx={{ width: "100%", marginBottom: "20px" }}
            renderOption={(props, option) => (
              <li {...props} key={option._id}>
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label="Procure por remédios"
                variant="outlined"
                sx={{ width: "100%", backgroundColor: "#fafafa" }}
              />
            )}
          />
          {!checked && (
            <TextField
              required
              id="quantity"
              label="Quantidade"
              type="number"
              variant="outlined"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              sx={{
                width: "100%",
                marginBottom: "20px",
                backgroundColor: "#fafafa",
              }}
            />
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Você quer vender todo o estoque deste medicamento?"
            sx={{ marginBottom: "20px" }}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color="error"
              disabled={!value}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#d32f2f",
                color: "#ffffff",
                padding: "10px 20px",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "bold",
                transition: "background-color 0.3s, box-shadow 0.3s",
                "&:hover": {
                  backgroundColor: "#c62828",
                },
                "&:active": {
                  backgroundColor: "#b71c1c",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              Remover
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;
