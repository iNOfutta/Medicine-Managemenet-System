import image from "../../Images/login.jpg";
import Image from "next/image";
import classes from "../login/login.module.css";
import { useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../firebase/Context/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";
import { auth } from "../../firebase/firebase";
import { updateProfile } from "firebase/auth";
import axios from "axios";

export default function SignUp() {
  const emailRef = useRef();
  const userRef = useRef();
  const passRef = useRef();
  const conPassRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passRef.current.value !== conPassRef.current.value) {
      return setError("Senha não coincide");
    }
    setError("");
    setLoading(true);
    /* signup(emailRef.current.value, passRef.current.value)
      .then(async (res) => {
        await updateProfile(auth.currentUser, {
          displayName: userRef.current.value,
        });
        const { uid, email } = auth.currentUser;
        axios
          .post(process.env.DB + "/User/addUser", {
            displayName: auth.currentUser.displayName,
            uid,
            email,
          })
          .then((res) => {
            // router.push('/login')
            // console.log(res);
            setLoading(false);
          })
          .catch((err) => {
            // console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
            setError("Email already in use !");
            break;
          case "auth/weak-password":
            setError("Length of password must be more than 6");
            break;
          default:
            setError("Something went wrong.... Please try again");
        }
        emailRef.current.value = "";
      }); */

    axios
      .post("api/User/addUser", {
        displayName: userRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
      })
      .then((res) => {
        router.push("/login");
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Registo | MedAssist</title>
      </Head>
      <div className={classes.main_container}>
        <div className={classes.img_container}>
          <Image src={image} height={700} width={700} alt="Login Image" />
        </div>
        <div className={classes.outer_conatiner}>
          <form onSubmit={handleSubmit}>
            <h1>Registo</h1>
            {/* User-name */}
            <div className={classes.username_con}>
              <label htmlFor="username">Seu nome de usuário </label>
              <input
                ref={userRef}
                type="text"
                required
                id="username"
                placeholder="nome de usuário..."
              />
            </div>
            <div className={classes.email_con}>
              <label htmlFor="email">Seu email</label>
              <input
                type="email"
                ref={emailRef}
                required
                id="email"
                placeholder="Email..."
              />
            </div>
            <div className={classes.pass_con}>
              <label htmlFor="pass">Sua senha</label>
              <input
                type="password"
                ref={passRef}
                autoComplete="true"
                required
                id="pass"
                placeholder="Senha..."
              />
            </div>
            <div className={classes.pass_con}>
              <label htmlFor="passConfirm">Confirmar senha</label>
              <input
                type="password"
                ref={conPassRef}
                autoComplete="true"
                required
                id="passConfirm"
                placeholder="Confirmar senha..."
              />
            </div>
            <label className={error === "" ? "hidden" : ""}>* {error}</label>
            <button
              type="submit"
              disabled={loading}
              className={loading ? classes.disable : ""}
            >
              {loading ? "Carregando..." : "Registe-se"}
            </button>
            <span>OR</span>
            <Link href="/login" className={classes.reg}>
              Entrar
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
