import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../firebase/Context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Loading from "../../Components/Loading/Loading";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
} from "@mui/material";

export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, setCurrentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const existingUser = localStorage.getItem("currentUser");

    if (existingUser) {
      const userData = JSON.parse(existingUser);
      setCurrentUser(userData);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    login(emailRef.current.value, passRef.current.value)
      .then((res) => {
        const userData = res?.data?.user;
        if (userData) {
          const existingUser = localStorage.getItem("currentUser");

          if (!existingUser) {
            localStorage.setItem("currentUser", JSON.stringify(userData));
          }
          setCurrentUser(userData);
          router.replace("/user");
        }
        setLoading(false);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/wrong-password":
            setError("Wrong Password. Please try again.");
            break;
          default:
            setError("Something went wrong. Please try again.");
            break;
        }
        setLoading(false);
      });
  };

  const images = [
    "https://atlantablackstar.com/wp-content/uploads/2015/03/drmcgriff-e5c2ebfdb0dca594f12cde613c93e4280d1e6e1b.jpg",
    "https://img.huffingtonpost.com/asset/5cd6505f2500003300a582ab.jpeg?ops=1778_1000",
    "https://img.einnews.com/large/428969/black-woman-doctor.png",
    "https://images.ctfassets.net/rzyyi40064na/36WPua2O0JBFI5edpkL2vx/53a06fea02c370e470e447be2667a4eb/iStock-877029554.jpg",
  ];
  const random = Math.floor(Math.random() * images.length);
  const randomImage = images[random];
  console.log("Random: ", random);

  return (
    <>
      <Head>
        <title>Entrar | HRL</title>
      </Head>
      {!loading && (
        <Grid container sx={{ minHeight: "100vh" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              bgcolor: "#0D1427",
              p: 4,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                variant="h4"
                component="h1"
                color="white"
                gutterBottom
                textAlign="center"
              >
                <Image
                  src={"/HRL-LOGO-OFICIAL.png"}
                  width={350}
                  height={80}
                  alt="logo HRL"
                  priority="performance"
                />
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  inputRef={emailRef}
                  required
                  margin="normal"
                  variant="outlined"
                  sx={{ bgcolor: "white" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  inputRef={passRef}
                  required
                  margin="normal"
                  variant="outlined"
                  sx={{ bgcolor: "white" }}
                />
                {error && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    * {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, padding: "10px" }}
                  disabled={loading}
                >
                  {loading ? "Carregando..." : "Login"}
                </Button>
                <Typography color="white" sx={{ mt: 2, textAlign: "center" }}>
                  Forgot Your Password?
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    flexWrap: "wrap",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    Admin
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    Doctor
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    Patient
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    Nurse
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    Receptionist
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    Laboratorist
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    Pharmacist
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    Accountant
                  </Button>
                </Box>
              </form>
            </Container>
          </Grid>
          <Grid item xs={12} md={6} sx={{ position: "relative" }}>
            <Image
              src={randomImage}
              alt="Login Image"
              layout="fill"
              objectFit="cover"
            />
          </Grid>
        </Grid>
      )}
      {loading && <Loading />}
    </>
  );
}
