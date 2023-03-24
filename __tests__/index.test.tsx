import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/pages/index";
import { projects } from "./mocks/projects";
import { gateways } from "./mocks/gateways";
import { AppProvider } from "@/components/AppProvider";

describe("Home", () => {
  it("render test, menu and shows no reports", async () => {
    render(
      <AppProvider>
        <Home projects={projects.data} gateways={gateways.data} />
      </AppProvider>
    );

    screen.getByText("Reports");
    screen.getByText("Easily generate a report of your transactions");

    await screen.findByText("No reports");
    await screen.findByText(
      "Currently you have no data for the reports to be generated. Once you start generating traffic through the Balance application the reports will be shown."
    );
  });

  it("click on button generates report and shows all projects and total", async () => {
    render(
      <AppProvider>
        <Home projects={projects.data} gateways={gateways.data} />
      </AppProvider>
    );

    fireEvent.click(screen.getByText("Generate report"));

    const title = await screen.findByText("Project 1");

    screen.getByText("6149cf562766867cfcb9234d");
    screen.getByText("3508.62 USD");

    await screen.findByText("Project 2");
    screen.getByText("Total: 13613.97 USD");
  });
});
