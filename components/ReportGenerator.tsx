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
import { FilterMenu } from "./FilterMenu";
import { Reports } from "./Reports";
import { useGetReport } from "./useGetReport";

type Props = {
  projects: Project[];
  gateways: Gateway[];
};

export const ReportGenerator: React.FC<Props> = ({ gateways, projects }) => {
  const [from, setFrom] = useState<Dayjs | null>(dayjs("2021-01-01"));
  const [to, setTo] = useState<Dayjs | null>(dayjs("2021-03-01"));

  const [projectId, setProjectId] = useState("");
  const [gatewayId, setGatewayId] = useState("");

  const { projectReports, refetch, error, isLoading, gatewayPercentages } = useGetReport({
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
      <FilterMenu
        projects={projects}
        gateways={gateways}
        projectId={projectId}
        gatewayId={gatewayId}
        from={from}
        to={to}
        onProjectChange={setProjectId}
        onGatewayChange={setGatewayId}
        onFromChange={setFrom}
        onToChange={setTo}
        onGenerate={handleGenerateReport}
      />

      <Reports
        projects={projectReports}
        gatewayName={gatewayName}
        projectName={projectName}
        gatewayPercentages={gatewayPercentages}
      />
    </Box>
  );
};
