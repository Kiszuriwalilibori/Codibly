import React, { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";

import Filter from "./Filter";
import Navigation from "./Navigation";
import useManageTextField from "hooks/useManageTextField";

const INITIAL_TEXTFIELD_VALUE = "";

const ColorsLayout = () => {
    const { value, setTextFieldValue, resetTextFieldValue } = useManageTextField();

    return (
        <>
            <Filter resetTextField={resetTextFieldValue} setTextField={setTextFieldValue} value={value} />
            <Outlet />
            <Navigation resetTextField={resetTextFieldValue} />
        </>
    );
};
export default React.memo(ColorsLayout);