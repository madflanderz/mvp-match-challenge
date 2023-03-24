import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { ProjectReport } from "types/ProjectReport";
import { PaymentsTable } from "./PaymentsTable";

type Props = {
  projects: ProjectReport[];
  projectName?: string;
  gatewayName?: string;
};

export const Reports: React.FC<Props> = ({
  projects,
  gatewayName,
  projectName,
}) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const reportTotal = projects
    .reduce((acc, current) => {
      return acc + parseFloat(current.total);
    }, 0)
    .toFixed(2);

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
    <Box>
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
              <PaymentsTable projectReport={projectReport} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box bgcolor="#F1FAFE" p={3} borderRadius={3} mt={4}>
        <Typography variant="h6">Total: {reportTotal} USD</Typography>
      </Box>
    </Box>
  );
};
