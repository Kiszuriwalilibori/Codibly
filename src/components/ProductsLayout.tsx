import React from "react";

import { Outlet } from "react-router-dom";

import Filter from "./Filter";
import Navigation from "./Navigation";
import useManageTextField from "hooks/useManageTextField";

const ProductsLayout = () => {
    const { value, setTextFieldValue, resetTextFieldValue } = useManageTextField();

    return (
        <>
            <Filter resetTextField={resetTextFieldValue} setTextField={setTextFieldValue} value={value} />
            <Outlet />
            <Navigation resetTextField={resetTextFieldValue} />
        </>
    );
};
export default React.memo(ProductsLayout);
