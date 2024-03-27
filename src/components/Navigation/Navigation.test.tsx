/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
import { screen } from "@testing-library/react";
import Navigation from "./Navigation";
import { render } from "../../../test/test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";

const resetTextField = jest.fn();

describe("Given Navigation component", () => {
    describe("when called with given props", () => {
        test("renders correctly buttons and icons. PreviousButton and NextButton shoud be disabled", () => {
            render(<Navigation resetTextField={resetTextField} />);

            const previousButton = screen.getByRole("button", {
                name: /to previous page/i,
            });
            expect(previousButton).toBeInTheDocument();
            expect(previousButton).toBeDisabled();
            const backIcon = screen.getByTestId("ArrowBackIcon");
            expect(backIcon).toBeInTheDocument();
            const nextButton = screen.getByRole("button", {
                name: /to next page/i,
            });
            expect(nextButton).toBeInTheDocument();
            expect(nextButton).toBeDisabled();
            const forwardIcon = screen.getByTestId("ArrowForwardIcon");
            expect(forwardIcon).toBeInTheDocument();
        });
    });
});
