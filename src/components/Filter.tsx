import React, { ChangeEvent, useMemo } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/ClearOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";

import debounce from "lodash/debounce";
import { useCallback, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { useDispatchAction, useMessage } from "../hooks";
import { areProductsNotEmpty, getProductsIDs, getCurrentPageNumber } from "reduxware/selectors";
import { PAGE_PREFIX, PRODUCT_PREFIX } from "config";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

interface Props {
    setTextField: (arg0: string) => void;
    resetTextField: () => void;
    value: string;
}
const DEBOUNCE_TIME_MS = 400;

const filterStyle = {
    width: "320px !important",
    margin: "0 auto",
};
const buttonStyle = {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
};

const Filter = (props: Props) => {
    const { resetTextField, setTextField, value } = props;
    const { setFilterId } = useDispatchAction();
    const areProductsLoaded = useSelector(areProductsNotEmpty);
    const currentDataPageNumber = useSelector(getCurrentPageNumber, shallowEqual);
    const productsIDs = useSelector(getProductsIDs);
    const showMessage = useMessage();
    const navigate = useNavigate();

    const handleReset = useCallback(
        debounce(() => {
            resetTextField();
            setFilterId(undefined);
        }, DEBOUNCE_TIME_MS),
        [value]
    );

    const handleChange = useCallback(
        (ev: ChangeEvent<HTMLInputElement>) => {
            if (!isNaN(ev.target.value as unknown as number)) {
                setTextField(ev.target.value as string);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [value]
    );

    const handleFilter = useCallback(
        debounce(() => {
            const valueAsNumber = +value;
            if (productsIDs.includes(valueAsNumber)) {
                setFilterId(valueAsNumber);
                // const newPathname = `${PAGE_PREFIX}${currentDataPageNumber.toString()}${PRODUCT_PREFIX}${value}`;
                // navigate(newPathname);
            } else {
                valueAsNumber &&
                    showMessage.warning(
                        `Requested Id ${valueAsNumber} is out of scope  ${productsIDs[0]} -  ${productsIDs.at(
                            -1
                        )}  . Try with another Id`
                    );
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, DEBOUNCE_TIME_MS),
        [value]
    );

    useEffect(() => {
        return () => {
            handleReset.cancel();
        };
    }, [handleReset]);

    useEffect(() => {
        return () => {
            handleFilter.cancel();
        };
    }, [handleFilter]);
    if (!areProductsLoaded) return null;

    return (
        <Stack sx={{ ...filterStyle }} direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
            <TextField
                id="standard-basic"
                disabled={!areProductsLoaded}
                value={value}
                onChange={handleChange}
                label="Enter product id"
                variant="outlined"
            />
            <Button disabled={!value} onClick={handleReset} sx={{ ...buttonStyle }}>
                <ClearIcon />
            </Button>
            <Button disabled={!value} onClick={handleFilter} sx={{ ...buttonStyle }}>
                <SearchIcon />
            </Button>
        </Stack>
    );
};
export default React.memo(Filter);
