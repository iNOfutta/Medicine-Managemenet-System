import classes from "./notification.module.css";
import Navbar from "../../../Components/subNavbar/navbar";
import Head from "next/head";
import DataTable from "../../../Components/DataTabel/DataTabel";

const Items = () => {
  return (
    <>
      <Head>
        <title>MedAssist | Notificação</title>
      </Head>
      <div className={classes.main_container}>
        <Navbar title="Notificação" />
        <div className={classes.notification_tabel}>
          <DataTable data={[]} col={[]} />
        </div>
      </div>
    </>
  );
};
export default Items;
