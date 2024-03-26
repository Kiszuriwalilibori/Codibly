import React from "react";
import { screen } from "@testing-library/react";
import Navigation from "./Navigation";
import { render } from "../../test/test-utils/testing-library-utils";

test("renders learn react link", () => {
    render(<Navigation resetTextField={() => {}} />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
