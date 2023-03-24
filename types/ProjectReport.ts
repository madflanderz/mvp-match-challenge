import { Gateway } from "./Gateway";
import { Project } from "./Project";
import { Report } from "./Report";

export type ProjectReport = Project & {
  total: string;
  payments: Report[];
};
