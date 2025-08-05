import {Box, Typography} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../themes";
import {mockDataContacts} from "../../data/mockData";
import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlined from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlined from "@mui/icons-material/SecurityOutlined";
/*import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
*/
import Header from "../../components/Header";
import {useTheme} from "@mui/material";

const Contacts = () => {
  const theme=useTheme();
  const colors=tokens(theme.palette.mode);
   
  const columns=[
    {field:"id", headerName:"ID", flex:1},
    {field:"registrarId", headerName:"Registrar ID", flex:1},
    {field:"address", headerName:"Address", flex:1},
    {field:"city", headerName:"City", flex:1},
    {field:"zipCode", headerName:"Zip Code", flex:1},
    {field:"name", headerName:"Name", flex:1,cellClassName:"name-column--cell"},
    {field:"email", headerName:"Email", flex:1},
    {field:"age", headerName:"Age",type:"Number", headerAlign:"left", align:"left", flex:1},
    {field:"phone", headerName:"Phone Number", flex:1},
    {field:"access", headerName:"Access Level", flex:1,renderCell:({row:{access}})=>{
        return(
            <Box width="60%" m="20px" p="5px" display="flex" justifyContent="center"
            backgroundColor={access==="admin" ? colors.greenAccent[600] : colors.greenAccent[700]}
            borderRadius="4px">
                <Typography color={colors.grey[100]} sx={{ml:"5px"}}>{access}</Typography>
            </Box>
        )
     }},        
  ]

  return(
    <Box>
                
        <Header title="CONTACTS" subtitle="List of Contacts for Future Reference"/>
        <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
            "& .MuiDataGrid-root":{
                border:"none",
            },
            "& .MuiDataGrid-cell":{
                borderBottom:"none",
            },
            "& .name-column--cell":{
                color:colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders":{
                backgroundColor:colors.blueAccent[700],
                borderBottom:"none",
            },
            "& .MuiDataGrid-virtualScroller":{
                backgroundColor:colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer":{
                borderTop:"none",
                backgroundColor:colors.blueAccent[700],
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
                color:`${colors.grey[100]} !important`,
            }
        }}>
            <DataGrid
            rows={mockDataContacts}
            columns={columns}
            components={{Toolbar:GridToolbar}}
            />
        </Box>
    </Box>
  );
}

export default Contacts;