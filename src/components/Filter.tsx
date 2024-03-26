import React, { ChangeEvent, useMemo } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/ClearOutlined";
import debounce from "lodash/debounce";
import { useCallback, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { useDispatchAction, useMessage } from "../hooks";
import { areProductsNotEmpty, getProductsIDs, getCurrentPageNumber } from "reduxware/selectors";
import { PAGE_PREFIX, PRODUCT_PREFIX } from "config";
import { useNavigate } from "react-router-dom";

interface Props {
    setTextField: (arg0: string) => void;
    resetTextField: () => void;
    value: string;
}
const DEBOUNCE_TIME_MS = 400;

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

    // const act = (ev: ChangeEvent<HTMLInputElement>) => {
    //     if (!isNaN(ev.target.value as unknown as number)) {
    //         setTextField(ev.target.value as string);
    //     }
    // };

    // const debouncedChangeHandler = useMemo(() => {
    //     const changeHandler = (event: any) => {
    //         act(event);
    //     };

    //     return debounce(changeHandler, 300);
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const valueAsNumber = +value;
        if (productsIDs.includes(valueAsNumber)) {
            setFilterId(valueAsNumber);
            // const newPathname = `${PAGE_PREFIX}${currentDataPageNumber.toString()}${PRODUCT_PREFIX}${value}`;
            // console.log(newPathname);
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
    }, [value]);

    useEffect(() => {
        return () => {
            handleReset.cancel();
        };
    }, [handleReset]);

    if (!areProductsLoaded) return null;

    return (
        <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
            <TextField
                id="standard-basic"
                disabled={!areProductsLoaded}
                value={value}
                onChange={handleChange}
                // onChange={debouncedChangeHandler}
                label="Enter product id"
                variant="standard"
            />
            <Button disabled={!value} onClick={handleReset}>
                <ClearIcon />
            </Button>
        </Stack>
    );
};
export default React.memo(Filter);
