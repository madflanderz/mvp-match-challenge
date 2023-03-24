import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ProjectReport } from "types/ProjectReport";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

type Props = {
  projectReport: ProjectReport;
  hideGateway?: boolean;
};

export const PaymentsTable: React.FC<Props> = ({
  projectReport,
  hideGateway,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            {!hideGateway && <TableCell align="center">Gateway</TableCell>}

            <TableCell align="center">Transaction ID</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectReport.payments.map((payment) => (
            <TableRow
              key={payment.paymentId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {payment.created}
              </TableCell>
              {!hideGateway && (
                <TableCell align="center">{payment.gateway?.name}</TableCell>
              )}
              <TableCell align="center">{payment.paymentId}</TableCell>
              <TableCell align="right">{payment.amount} USD</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
