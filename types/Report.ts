import { Gateway } from "./Gateway";

const report = {
  paymentId: "6149cf567833e57669e60455",
  amount: 2663.69,
  projectId: "ERdPQ",
  gatewayId: "i6ssp",
  userIds: ["rahej"],
  modified: "2021-09-20",
  created: "2021-04-11",
};

export type Report = typeof report & {
  gateway?: Gateway;
};
