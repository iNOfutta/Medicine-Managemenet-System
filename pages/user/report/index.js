import classes from "./report.module.css";
import Navbar from "../../../Components/subNavbar/navbar";
import Head from "next/head";

const Items = () => {
  return (
    <>
      <Head>
        <title>MedAssist | Relatório</title>
      </Head>
      <div className={classes.main_container}>
        <Navbar title="Relatório" />
      </div>
    </>
  );
};
export default Items;
