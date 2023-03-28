import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ProjectReport } from "types/ProjectReport";

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
