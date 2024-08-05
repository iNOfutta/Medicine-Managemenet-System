import classes from "./chart.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart() {
  const data = [
    { name: "Janeiro", Total: 1200 },
    { name: "Fevereiro", Total: 2100 },
    { name: "Março", Total: 800 },
    { name: "Abril", Total: 1600 },
    { name: "Maio", Total: 900 },
    { name: "Junho", Total: 1700 },
  ];

  return (
    <div className={classes.chart}>
      <div className={classes.title}>Últimos 6 meses (receita)</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className={classes.chartGrid} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
