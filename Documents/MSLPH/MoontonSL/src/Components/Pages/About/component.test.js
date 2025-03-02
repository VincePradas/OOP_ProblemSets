import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DepartmentCard from "./components/DepartmenCard";

const resizeWindow = (width) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event("resize"));
};

describe("DepartmentCard Component", () => {
  test("renders with title and description", () => {
    render(
      <DepartmentCard
        title="Community Engagement"
        description="Building connections and fostering a vibrant gaming community."
      />
    );
    expect(screen.getByText("Community Engagement")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Building connections and fostering a vibrant gaming community."
      )
    ).toBeInTheDocument();
  });

  test("applies mobile styles when window width is less than 768px", () => {
    resizeWindow(500);
    render(
      <DepartmentCard
        title="Community Engagement"
        description="Building connections and fostering a vibrant gaming community."
      />
    );

    const titleElement = screen.getByText("Community Engagement");
    expect(titleElement).toHaveClass("text-[24px]");
    const descriptionElement = screen.getByText(
      "Building connections and fostering a vibrant gaming community."
    );
    expect(descriptionElement).toHaveClass("text-base");
  });

  test("applies desktop styles when window width is greater than or equal to 768px", () => {
    resizeWindow(1024);
    render(
      <DepartmentCard
        title="Community Engagement"
        description="Building connections and fostering a vibrant gaming community."
      />
    );

    const titleElement = screen.getByText("Community Engagement");
    expect(titleElement).toHaveClass("text-[32px]");
    const descriptionElement = screen.getByText(
      "Building connections and fostering a vibrant gaming community."
    );
    expect(descriptionElement).toHaveClass("text-[18px]");
  });
});
