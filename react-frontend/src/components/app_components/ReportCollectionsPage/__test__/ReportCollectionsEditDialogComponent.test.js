import React from "react";
import { render, screen } from "@testing-library/react";

import ReportCollectionsEditDialogComponent from "../ReportCollectionsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders reportCollections edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ReportCollectionsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("reportCollections-edit-dialog-component")).toBeInTheDocument();
});
