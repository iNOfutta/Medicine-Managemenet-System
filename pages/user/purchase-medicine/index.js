import Navbar from "../../../Components/subNavbar/navbar";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import NavigationBar from "../../../Components/SideLayout/Navigation/NavigationBar";
import { useContext, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../../firebase/Context/AuthContext";
import AlertDialog from "../../../Components/AlertDialog/AlertDialog";
import Head from "next/head";
import { StateContext } from "../../../Context/StateContext";

const AddItem = () => {
  // context
  const { state, dispatch } = useContext(StateContext);
  const { currentUser } = useAuth();

  // state
  const [value, setValue] = useState(new Date());
  const [data, setData] = useState({
    name: "",
    quantity: "",
    price: 0,
  });

  // router
  const router = useRouter();

  // change state of date to user selected date
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  // update state values
  const changeHandle = (e) => {
    const element = e.target.getAttribute("id");
    setData((current) => ({ ...current, [element]: e.target.value }));
  };

  // close the alert
  const closeAlert = () => {
    dispatch({ type: "close alert" });
    router.replace("/user/items");
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let currentDate = new Date();
    const expiryDate = value;

    if (expiryDate > currentDate) {
      axios
        .post("/api/Medicine/add", {
          uid: currentUser._id,
          ...data,
          expiryDate: value,
          uploadOn: currentDate,
        })
        .then((res) => {
          dispatch({
            type: "open popup",
            payload: {
              msg: res?.data?.msg,
              type: "success",
            },
          });
          router.replace("/user/purchase");
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
    } else {
      dispatch({
        type: "open alert",
        payload: {
          title: "Alerta de vencimento...",
          msg: "Oppps! O medicamento já expirou... você não pode adicionar em estoque",
        },
      });
    }
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
        <title>HRL | Abastecimento de Medicamento</title>
      </Head>
      <Navbar title="Abastecimento de Medicamento" />
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
          <TextField
            sx={{
              width: "100%",
              marginBottom: "20px",
              backgroundColor: "#fafafa",
            }}
            id="name"
            label="Nome"
            variant="outlined"
            value={data.name}
            onChange={changeHandle}
          />
          <TextField
            sx={{
              width: "100%",
              marginBottom: "20px",
              backgroundColor: "#fafafa",
            }}
            id="quantity"
            label="Quantidade"
            type="number"
            variant="outlined"
            value={data.quantity}
            onChange={changeHandle}
          />
          <div style={{ marginBottom: "20px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Data de Expiração"
                inputFormat="DD/MM/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      width: "100%",
                      backgroundColor: "#fafafa",
                    }}
                    {...params}
                  />
                )}
                views={["day", "month", "year"]}
              />
            </LocalizationProvider>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#4caf50",
                color: "#ffffff",
                padding: "10px 20px",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "bold",
                transition: "background-color 0.3s, box-shadow 0.3s",
                "&:hover": {
                  backgroundColor: "#45a049",
                },
                "&:active": {
                  backgroundColor: "#388e3c",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              ADICIONAR
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;
