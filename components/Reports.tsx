import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { ProjectReport } from "types/ProjectReport";
import { PaymentsTable } from "./PaymentsTable";
import { PieChartDisplay } from "./PieChartDisplay";

type Props = {
  projects: ProjectReport[];
  projectName?: string;
  gatewayName?: string;
  gatewayPercentages: {
    name: string | undefined;
    id: string;
    percentage: number;
  }[];
};

export const Reports: React.FC<Props> = ({
  projects,
  gatewayName,
  projectName,
  gatewayPercentages,
}) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  useEffect(() => {
    setExpanded(projects[0].projectId);
  }, [projects]);

  const reportTotal = projects
    .reduce((acc, current) => {
      return acc + parseFloat(current.total);
    }, 0)
    .toFixed(2);

  const isSingleView =
    (gatewayName && !projectName) || (!gatewayName && projectName);

  const shouldShowTotal = !isSingleView && projects.length > 1;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  if (!projects.length) {
    return (
      <Container maxWidth="sm">
        <Stack spacing={2} alignItems="center" py={2} px={4}>
          <Typography variant="h6" gutterBottom>
            No reports
          </Typography>
          <Typography variant="body2">
            Currently you have no data for the reports to be generated. Once you
            start generating traffic through the Balance application the reports
            will be shown.
          </Typography>
          <Image
            src="/icons/no_results.svg"
            alt="no results"
            width={403}
            height={172}
          />
        </Stack>
      </Container>
    );
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={isSingleView ? 7 : 12}>
        <Box bgcolor="#F1FAFE" p={3} borderRadius={3}>
          <Typography variant="h6" mb={4}>
            {projectName || "All projects"} | {gatewayName || "All gateways"}
          </Typography>
          {projects.map((projectReport) => (
            <Accordion
              key={projectReport.projectId}
              expanded={expanded === projectReport.projectId}
              onChange={handleChange(projectReport.projectId)}
              sx={{ mb: 2 }}
            >
              <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant="h6" flex={1}>
                  {projectReport.name}
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                  Total: {projectReport.total} USD
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PaymentsTable
                  projectReport={projectReport}
                  hideGateway={!!gatewayName}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {shouldShowTotal && (
          <Box bgcolor="#F1FAFE" p={3} borderRadius={3} mt={4}>
            <Typography variant="h6">Total: {reportTotal} USD</Typography>
          </Box>
        )}
      </Grid>

      {isSingleView && (
        <Grid item xs={5}>
          <PieChartDisplay items={gatewayPercentages} />

          <Box bgcolor="#F1FAFE" p={3} borderRadius={3} mt={4}>
            <Typography variant="h6">
              {gatewayName ? "Gateway" : "Project"} Total: {reportTotal} USD
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
