import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ data, col }) => {
  const rows = data?.length ? data : [];

  return (
    <div
      style={{
        height: 475,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: "#f4f4f4", // Light gray background for contrast
        padding: "16px", // Add padding around the table
      }}
    >
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={col}
        pageSize={7}
        rowsPerPageOptions={[7]}
        style={{
          textAlign: "center",
          fontSize: "14px", // Consistent font size
          border: "none", // Remove default border
        }}
        sx={{
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #ddd", // Add bottom border to cells
            padding: "10px", // Increase padding for better spacing
            textAlign: "center", // Center align cells
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#fff", // Primary color header
            color: "#000", // White text color
            fontSize: "16px", // Larger font size for header
            fontWeight: "bold", // Bold font for header
            textAlign: "center", // Center align header text
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f1f1f1", // Light gray hover effect
          },
          "& .MuiDataGrid-footerContainer": {
            justifyContent: "center",
            padding: "8px",
            backgroundColor: "#fff", // Matching footer background color
            color: "#000", // White text color for footer
          },
        }}
      />
    </div>
  );
};

export default DataTable;
