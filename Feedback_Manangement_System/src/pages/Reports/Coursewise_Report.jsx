import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

function Coursewise_Report() {
  const columns = [
    { field: "id", headerName: "Sr.No", flex: 0.5 },
    { field: "module_name", headerName: "Module Name", flex: 1 },
    { field: "mid_module", headerName: "Mid Module", flex: 1 },
    { field: "end_module", headerName: "End Module", flex: 1 },
    { field: "infra_end", headerName: "Infra End", flex: 1 },
  ];

const rows = [
  { id: 1, module_name: "CAT-01", mid_module: "online mid module lab", end_module: "offline module end feedback", infra_end: "offline module end feedback theory" },
 
];


  return (
     <div className="container">
           <h2 className="page-header text-center">Admin Dashboard</h2>
   
        
   
       <Box p={3}>
         {/* Filter Section */}
        <div className="row mb-3 col-12">
             <div className="col-md-3 mb-3">
             <select className="form-select">
             <option selected>Course</option>
             <option value="dac">yyy</option>
       
             </select>
           </div>

           <div className="col-md-3 mb-3">
             <select className="form-select">
               <option selected>Mid Module</option>
               <option value="mid">xyz</option>
              
             </select>
           </div>
           <div  className="col-md-3 mb-3">
             <select className="form-select">
             <option selected>Module End</option>
             <option value=".net">pqr</option>
           
             </select>
           </div>
           <div className="col-md-3 mb-3">
             <select className="form-select">
               <option selected>Infra End</option>
               <option>abc</option>
             </select>
           </div>
   
     
   
           </div>
          
         
        <hr className="mb-4" />
         <div style={{ height: 400, width: "100%" }}>
           <DataGrid
            rows={rows}
           columns={columns}
            pageSize={5} 
            
            />
         </div>
       </Box>
       </div>
  )
}

export default Coursewise_Report