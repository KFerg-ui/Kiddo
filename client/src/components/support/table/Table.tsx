import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Link } from 'react-router-dom'



const columns: GridColDef[] = [
  { field: "id", hide: true },
  { field: "name", headerName: "Name", width: 150 },
  { field: "company", headerName: "Company", width: 150, renderCell: (params) => (
    <Link to={`/support/${params.value}`}>{params.value}</Link>)},
  { field: "investments", headerName: "Investments", width: 150 },
  { field: "email", headerName: "Email", width: 150 },

];

export default function Table(props) {
  const [rows, setRows] = React.useState([{ id: 0 }]);

  React.useEffect(() => {
    let rows = [{}];
    let list = props.investorList;
    for (let i = 0; i < list.length; i++) {
      rows[i] = {
        id: i,
        name: list[i].firstName + " " + list[i].lastName,
        company: list[i].business,
        email: list[i].email,
      };
    }
    setRows(rows);
  }, [props.investorList]);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
