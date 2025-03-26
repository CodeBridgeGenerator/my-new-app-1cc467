import React from "react";
import { render, screen } from "@testing-library/react";

import ReportCollectionsPage from "../ReportCollectionsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders reportCollections page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ReportCollectionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("reportCollections-datatable")).toBeInTheDocument();
    expect(screen.getByRole("reportCollections-add-button")).toBeInTheDocument();
});
