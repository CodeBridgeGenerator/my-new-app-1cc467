import React from "react";
import { render, screen } from "@testing-library/react";

import ReportCollectionsCreateDialogComponent from "../ReportCollectionsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders reportCollections create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ReportCollectionsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("reportCollections-create-dialog-component")).toBeInTheDocument();
});
