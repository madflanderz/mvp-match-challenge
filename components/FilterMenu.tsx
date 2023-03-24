import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useMemo, useState } from "react";
import { Gateway } from "types/Gateway";
import { Project } from "types/Project";
import { Reports } from "./Reports";
import { useGetReport } from "./useGetReport";

type Props = {
  projects: Project[];
  gateways: Gateway[];
  projectId: string;
  gatewayId: string;
  onProjectChange: (projectId: string) => void;
  onGatewayChange: (gatewayId: string) => void;
  from: Dayjs | null;
  to: Dayjs | null;
  onFromChange: (from: Dayjs | null) => void;
  onToChange: (from: Dayjs | null) => void;
  onGenerate: () => void;
};

export const FilterMenu: React.FC<Props> = ({
  gateways,
  projects,
  projectId,
  gatewayId,
  from,
  to,
  onProjectChange,
  onGatewayChange,
  onFromChange,
  onToChange,
  onGenerate,
}) => {
  return (
    <Grid container spacing={2} py={4}>
      <Grid item xs={4}>
        <Typography variant="h5" fontWeight="bold">
          Reports
        </Typography>
        <Typography variant="body1" color="text.secondary" fontWeight="bold">
          Easily generate a report of your transactions
        </Typography>
      </Grid>
      <Grid item xs={8} justifyContent="flex-end" display="flex">
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              size="small"
              value={projectId}
              onChange={(event) => onProjectChange(event.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Select project" }}
            >
              <MenuItem value="">All projects</MenuItem>
              {projects.map((project) => (
                <MenuItem key={project.projectId} value={project.projectId}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
            {/* <FormHelperText>Select project</FormHelperText> */}
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              size="small"
              value={gatewayId}
              onChange={(event) => onGatewayChange(event.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Select Gateway" }}
            >
              <MenuItem value="">All gateways</MenuItem>
              {gateways.map((gateway) => (
                <MenuItem key={gateway.gatewayId} value={gateway.gatewayId}>
                  {gateway.name}
                </MenuItem>
              ))}
            </Select>
            {/* <FormHelperText>Select gateway</FormHelperText> */}
          </FormControl>

          <DatePicker
            // label="From date"

            value={from}
            onChange={(newValue) => onFromChange(newValue)}
            sx={{
              "& .MuiInputBase-input": {
                // padding: "8px 14px !important",
                // paddingRight: 0,
                paddingTop: "8px",
                paddingBottom: "8px",
                // color: "green",
              },
            }}
          />
          <DatePicker
            // label="To date"
            value={to}
            onChange={(newValue) => onToChange(newValue)}
            sx={{
              "& .MuiInputBase-input": {
                padding: "8px 14px !important",
                // color: "green",
              },
            }}
          />

          <Button
            variant="contained"
            size="large"
            sx={{ whiteSpace: "nowrap", minWidth: "auto" }}
            onClick={onGenerate}
          >
            Generate report
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
