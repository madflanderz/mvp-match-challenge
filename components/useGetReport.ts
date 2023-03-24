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
  const res = await fetch("http://178.63.13.157:8090/mock-api/api/report", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(variables),
  });
  const data = await res.json();

  return data;
};

export const useGetReport = ({
  gateways,
  projects,
  reportVariables,
}: HookProps) => {
  const { from, to } = reportVariables;

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

  const total = useMemo(() => {
    return projectReports
      .reduce((acc, current) => {
        return acc + parseFloat(current.total);
      }, 0)
      .toFixed(2);
  }, [projectReports]);

  const gatewayPercentages = useMemo(() => {
    const gatewayGroup: Record<string, number> = {};

    if (projectReports.length !== 1) {
      return [];
    }
    const report = projectReports[0];

    report.payments.forEach((payment) => {
      payment.gatewayId;
      if (gatewayGroup[payment.gatewayId]) {
        gatewayGroup[payment.gatewayId] += payment.amount;
      } else {
        gatewayGroup[payment.gatewayId] = payment.amount;
      }
    });

    const percentages = Object.keys(gatewayGroup).map((key) => {
      return {
        name: gateways.find((gateway) => gateway.gatewayId === key)?.name,
        id: key,
        percentage: gatewayGroup[key] / parseFloat(report.total),
      };
    });

    return percentages;
  }, [projectReports]);

  const projectPercentages = useMemo(() => {
    const group: Record<string, number> = {};

    projectReports.forEach((report) => {
      report.payments.forEach((payment) => {
        if (group[payment.projectId]) {
          group[payment.projectId] += payment.amount;
        } else {
          group[payment.projectId] = payment.amount;
        }
      });
    });

    const percentages = Object.keys(group).map((key) => {
      return {
        name: projects.find((project) => project.projectId === key)?.name,
        id: key,
        percentage: group[key] / parseFloat(total),
      };
    });

    return percentages;
  }, [projectReports]);

  return {
    projectReports,
    gatewayPercentages,
    projectPercentages,
    error,
    isLoading,
    refetch,
    total,
  };
};
