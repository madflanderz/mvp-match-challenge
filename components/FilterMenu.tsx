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
};

export const FilterMenu: React.FC<Props> = ({ gateways, projects }) => {
  const [from, setFrom] = useState<Dayjs | null>(dayjs("2021-01-01"));
  const [to, setTo] = useState<Dayjs | null>(dayjs("2021-03-01"));

  const [projectId, setProjectId] = useState("");
  const [gatewayId, setGatewayId] = useState("");

  const { projectReports, refetch, error, isLoading } = useGetReport({
    reportVariables: {
      from: from?.format("YYYY-MM-DD") || "",
      to: to?.format("YYYY-MM-DD") || "",
      gatewayId,
      projectId,
    },
    projects,
    gateways,
  });

  const [projectName, setProjectName] = useState<string | undefined>();
  const [gatewayName, setGatewayName] = useState<string | undefined>();

  const handleGenerateReport = () => {
    const gateway = gateways.find((gateway) => gateway.gatewayId === gatewayId);
    const project = projects.find((project) => project.projectId === projectId);
    setGatewayName(gateway?.name);
    setProjectName(project?.name);

    refetch();
  };

  return (
    <Box flex={1} px={7} mb={4}>
      <Grid container spacing={2} py={4}>
        <Grid item xs={4}>
          <Typography variant="h6">Reports</Typography>
          <Typography variant="body1">
            Easily generate a report of your transactions
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                size="small"
                value={projectId}
                onChange={(event) => setProjectId(event.target.value)}
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
                onChange={(event) => setGatewayId(event.target.value)}
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
              onChange={(newValue) => setFrom(newValue)}
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
              onChange={(newValue) => setTo(newValue)}
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
              onClick={() => handleGenerateReport()}
            >
              Generate report
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Reports
        projects={projectReports}
        gatewayName={gatewayName}
        projectName={projectName}
      />
    </Box>
  );
};
