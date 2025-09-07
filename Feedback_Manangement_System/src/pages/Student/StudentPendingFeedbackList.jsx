import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';
//import { useNavigate } from "react-router-dom";
const columns= [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'course',
    headerName: 'Course',
   // width: 150,
    flex: 1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Course</span>
    ),
  },
  {
    field: 'date',
    headerName: 'Date',
   // width: 150,
    flex: 1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Date</span>
    ),
  },
  {
    field: 'module',
    headerName: 'Module',
   // type: 'number',
   // width: 150,
    flex: 1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Module</span>
    ),
  },
  {
    field: 'type',
    headerName: 'Type',
    sortable: false,
    flex: 1,
  //  width: 150,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Type</span>
    ),
    
  },

{
    field: 'session',
    headerName: 'Session',
   // type: 'number',
   // width: 150,
    flex: 1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Session</span>
    ),
  },
  
  {
    field: 'rating',
    headerName: 'Rating',
   // width: 150,
    flex: 1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Rating</span>
    ),
  },

];

const rows = [
  { id: 1, course: 'PG-DAC',date: '20-08-2025', module: 'DOT NET',type: 'Mid Module',session: '4',rating:'4.3' },
   { id: 2, course: 'PG-DAC',date: '15-08-2025', module: 'JAVA',type: 'Mid Module',session: '5',rating:'4.2' },
    { id: 3, course: 'PG-DAC',date: '10-08-2025', module: 'DBT',type: 'Mid Module',session: '4',rating:'3.2' },
];

function StudentPendingFeedbackList() {

  return (

    <div className='container'>
        
        <h2 className="table-header text-center mt-3">Pending Feedback's</h2>
         <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          padding: 2,
          borderRadius: 1,
        }}
      >
        

      </Box>

        <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
    </div>
    
  );
}

export default StudentPendingFeedbackList;
