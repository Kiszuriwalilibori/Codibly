import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/ClearOutlined";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useDispatchAction } from "../hooks";
import { areProductsNotEmpty, getProductsIDs } from "reduxware/selectors";
import { useMessage } from "hooks";

interface Props {
    setTextField: (arg0: string) => void;
    resetTextField: () => void;
    value: string;
}
const Filter = (props: Props) => {
    const { resetTextField, setTextField, value } = props;
    const { setFilterId } = useDispatchAction();
    const areProductsLoaded = useSelector(areProductsNotEmpty);
    const productsIDs = useSelector(getProductsIDs);
    const showMessage = useMessage();

    const clearInput = useCallback(
        () => {
            resetTextField();
            setFilterId(undefined);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [value]
    );

    const changeHandler = useCallback(
        (ev: { target: { value: unknown | number } }) => {
            if (!isNaN(ev.target.value as unknown as number)) {
                setTextField(ev.target.value as string);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [value]
    );

    useEffect(() => {
        const valueAsNumber = +value;
        if (productsIDs.includes(valueAsNumber)) {
            setFilterId(valueAsNumber);
        } else {
            valueAsNumber &&
                showMessage.warning(
                    `Requested Id ${valueAsNumber} is out of scope  ${productsIDs[0]} -  ${productsIDs.at(
                        -1
                    )}  . Try with another Id`
                );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    if (!areProductsLoaded) return null;

    return (
        <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
            <TextField
                id="standard-basic"
                disabled={!areProductsLoaded}
                value={value}
                onChange={changeHandler}
                label="Enter product id"
                variant="standard"
            />
            <Button disabled={!value} onClick={clearInput}>
                <ClearIcon />
            </Button>
        </Stack>
    );
};
export default React.memo(Filter);
