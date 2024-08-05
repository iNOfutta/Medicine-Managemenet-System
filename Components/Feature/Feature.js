import classes from "./feature.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function formatCurrencyToLocale(
  amount,
  lang = "pt-AO",
  currency = "AOA"
) {
  if (!amount) {
    return null;
  }
  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: currency,
    currencyDisplay: "code",
  }).format(amount);
}

export default function Feature() {
  return (
    <div className={classes.feature}>
      <div className={classes.top}>
        <h1 className={classes.title}>Total de Transações</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className={classes.bottom}>
        <div className={classes.featureChart}>
          <CircularProgressbar value={70} text="70%" strokeWidth={7} />
        </div>
        <p className={classes.titleb}>Total de transações realizadas hoje</p>
        <p className={classes.amount}>{formatCurrencyToLocale(420)}</p>
        <p className={classes.desc}>
          Processamento de transações anteriores. Últimas transações podem não
          estar incluídas.
        </p>
      </div>
    </div>
  );
}
