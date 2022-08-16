import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from 'react-router-dom'
import "../CustomerServicePortal.css" ;



const columns: GridColDef[] = [
  { field: "id", hide: true },
  { field: "name", headerName: "Name", width: 150 },
  { field: "company", headerName: "Company", width: 150, renderCell: (params) => (
    <Link className="businessName" to={`/support/${params.value}`}>{params.value}</Link>)},
  { field: "email", headerName: "Email", width: 150 },
  { field: "lastContact", headerName: "Last Date of Contact", width: 150 },

];

export default function Table(props) {
  const [rows, setRows] = React.useState<[object]>([{ id : 0 }]);

  React.useEffect(() => {
    let ourRows : [object]= [{ id : 0 }];
    let list = props.investorList;
    for (let i = 0; i < list.length; i++) {
      ourRows[i] = {
        id: i,
        name: list[i].firstName + " " + list[i].lastName,
        company: list[i].business,
        email: list[i].email,
        lastContact: list[i].contact[list[i].contact.length -1]
      };
    }
    setRows(ourRows);
  }, [props.investorList]);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows = {rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
