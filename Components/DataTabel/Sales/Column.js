export const columns_sale = [
  { field: "_id", headerName: "ID", width: 220 },
  { field: "name", headerName: "Nome", width: 190 },
  {
    field: "quantity",
    headerName: "Quantidade inicial",
    type: "number",
    width: 160,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "remaining_quantity",
    headerName: "Quantidade restante",
    type: "number",
    width: 160,
    align: "center",
    headerAlign: "center",
  },
  /* {
    field: "sales_ammount",
    headerName: "Valor das vendas",
    type: "number",
    width: 160,
  }, */
  {
    id: "userName",
    field: "userName",
    headerName: "Usuário(a)",
    width: 180,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "date",
    headerName: "Data da Remoção",
    type: "string",
    width: 180,
    align: "center",
    headerAlign: "center",
  },
];
