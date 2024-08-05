import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { columns } from "./columns";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function HistoryTable({ rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px", // Add padding around the table
        backgroundColor: "#fff", // Ensure background is white
      }}
    >
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  width={column.width}
                  sx={{
                    backgroundColor: "#f5f5f5", // Light gray background for header
                    color: "#000", // Text color for header
                    fontSize: "16px", // Larger font size for header
                    fontWeight: "bold", // Bold font for header
                    textAlign: "center", // Center align header text
                    borderBottom: "1px solid #ddd", // Bottom border for header
                  }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "type") {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            textAlign: "center",
                            color:
                              value === "add"
                                ? "green"
                                : value === "sale" || value === "remove"
                                ? "orange"
                                : "red",
                          }}
                        >
                          <div>
                            {value === "add"
                              ? "Abastecimento"
                              : value === "sale"
                              ? "Venda"
                              : "Remoção"}
                          </div>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          textAlign: "center",
                          color:
                            column.id === "quantity"
                              ? value > 0
                                ? "green"
                                : "red"
                              : "",
                          borderBottom: "1px solid #ddd", // Add bottom border to cells
                        }}
                      >
                        <div>
                          {column.id === "quantity" ? (
                            value > 0 ? (
                              <ArrowDropUpIcon />
                            ) : (
                              <ArrowDropDownIcon />
                            )
                          ) : (
                            ""
                          )}
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "8px",
        }}
        rowsPerPageOptions={[7, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
