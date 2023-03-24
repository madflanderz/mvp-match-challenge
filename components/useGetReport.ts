import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { Gateway } from "types/Gateway";
import { Project } from "types/Project";
import { ProjectReport } from "types/ProjectReport";
import { Report } from "types/Report";

type ReportVariables = {
  projectId: string;
  gatewayId: string;
  from: string;
  to: string;
};

type HookProps = {
  projects: Project[];
  gateways: Gateway[];
  reportVariables: ReportVariables;
};

export const fetchReport = (variables: ReportVariables) => async () => {
  console.log("fetchReport###########################################");

  const res = await fetch("http://178.63.13.157:8090/mock-api/api/report", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(variables),
  });
  const data = await res.json();

  console.log("yeahhhh", data);
  return data;
};

export const useGetReport = ({
  gateways,
  projects,
  reportVariables,
}: HookProps) => {
  const { projectId, gatewayId, from, to } = reportVariables;

  const { data, error, isLoading, refetch } = useQuery<{ data: Report[] }>(
    ["reports", /*projectId, gatewayId,*/ from, to],
    fetchReport(reportVariables),
    {
      enabled: false,
    }
  );

  console.log({ data, error, isLoading, reportVariables });

  const projectReports: ProjectReport[] = useMemo(() => {
    if (data?.data) {
      const projectReports = projects
        .filter((project) => {
          return data.data.some(
            (report) => report.projectId === project.projectId
          );
        })
        .map((project) => {
          const payments = data.data.filter(
            (report) => report.projectId === project.projectId
          );

          const paymentsWithGateways = payments.map((report) => {
            const gateway = gateways.find(
              (gateway) => gateway.gatewayId === report.gatewayId
            );

            return {
              ...report,
              gateway,
            };
          });

          const total = paymentsWithGateways
            .reduce((acc, current) => {
              return acc + current.amount;
            }, 0)
            .toFixed(2);

          return {
            ...project,
            total,
            payments: paymentsWithGateways,
          };
        });
      console.log(projectReports);
      return projectReports;
    }
    return [];
  }, [data]);

  const gatewayPercentages = useMemo(() => {
    const gatewayGroup: Record<string, number> = {};

    if (projectReports.length !== 1) {
      return [];
    }
    const report = projectReports[0];

    projectReports.forEach((report) => {
      report.payments.forEach((payment) => {
        payment.gatewayId;
        if (gatewayGroup[payment.gatewayId]) {
          gatewayGroup[payment.gatewayId] += payment.amount;
        } else {
          gatewayGroup[payment.gatewayId] = payment.amount;
        }
      });
    });

    console.log("gatewayGroup", gatewayGroup);

    const percentages = Object.keys(gatewayGroup).map((key) => {
      return {
        name: gateways.find((gateway) => gateway.gatewayId === key)?.name,
        id: key,
        percentage: gatewayGroup[key] / parseFloat(report.total),
      };
    });

    console.log("percentages", percentages);

    return percentages;
  }, [projectReports]);

  return {
    projectReports,
    gatewayPercentages,
    error,
    isLoading,
    refetch,
  };
};
