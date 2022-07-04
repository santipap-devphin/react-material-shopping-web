import React from 'react'
import styled  from "styled-components";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const TableComPare = () => {

    const CustomTable = styled.table`
    &&& {
        main {display: flex;}
main > * {border: 1px solid;}
table {border-collapse: collapse; font-family: helvetica}
td, th {border:  1px solid;
      padding: 10px;
      min-width: 200px;
      background: white;
      box-sizing: border-box;
      text-align: left;
}
.table-container {
  position: relative;
  max-height:  900px;
  width: 1200px;
  
}

thead th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
  background: hsl(20, 50%, 70%);
}

thead th:first-child {
  left: 0;
  z-index: 3;
}

tfoot {
  position: -webkit-sticky;
  bottom: 0;
  z-index: 2;
}

tfoot td {
  position: sticky;
  bottom: 0;
  z-index: 2;
  background: hsl(20, 50%, 70%);
}

tfoot td:first-child {
  z-index: 3;
}

tbody {
  overflow: scroll;
  height: 200px;
}

/* MAKE LEFT COLUMN FIXEZ */
tr > :first-child {
  position: -webkit-sticky;
  position: sticky; 
  background: hsl(180, 50%, 70%);
  left: 0; 
}
/* don't do this */
tr > :first-child {
  box-shadow: inset 0px 1px black;
}
       
    }
    `;

    

  return ( <Container>
               
                    <CustomTable>
                             <div className="table-container">
                             <div className="table-horizontal-container">
                            <table className="unfixed-table">
                            <thead>
                                <tr><th>Header</th><th>Header</th><th>Header</th><th>Header</th><th>Header</th><th>Header</th><th>Header</th><th>Header</th></tr>
                            </thead>
                            <tbody>
                                <tr><th>Column one</th><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><th>Column one</th><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column one</td><td>Column two</td><td>Column three</td><td>Column four</td><td>Column firve</td><td>Column six</td><td>Column seven</td><td>Column eight</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                                <tr><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td><td>Column</td></tr>
                            </tbody>
                            
                            <tfoot>
                                <tr><td>Footer</td><td>Footer</td><td>Footer</td><td>Footer</td><td>Footer</td><td>Footer</td><th>Footer</th><th>Footer</th></tr>
                            </tfoot>
                            </table> 
                            </div>   
                            </div>   
                    </CustomTable>
                   
              
          </Container>
  )
}

export default TableComPare