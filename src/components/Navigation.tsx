import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useCallback } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useDispatchAction from "hooks/useDispatchAction";

import { numberToPathname } from "helpers";
import { getIsPreviousButtonVisible, getIsNextButtonVisible, getCurrentPageNumber } from "reduxware/selectors";

const buttonStyle = {
    width: "150px",
};
interface Props {
    resetTextField: () => void;
}
const Navigation = (props: Props) => {
    const { resetTextField } = props;
    const { showNextPage, showPreviousPage } = useDispatchAction();
    const isPreviousButtonVisible = useSelector(getIsPreviousButtonVisible);
    const isNextButtonVisible = useSelector(getIsNextButtonVisible);
    const currentDataPageNumber = useSelector(getCurrentPageNumber, shallowEqual);
    const { setFilterId } = useDispatchAction();
    const navigate = useNavigate();

    const previousClickHandler = useCallback(() => {
        setFilterId(undefined);
        showPreviousPage();
        const newPathname = numberToPathname(currentDataPageNumber - 1);
        newPathname && navigate(newPathname);
        resetTextField();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDataPageNumber]);

    const nextClickHandler = useCallback(() => {
        setFilterId(undefined);
        showNextPage();
        const newPathname = numberToPathname(currentDataPageNumber + 1);
        newPathname && navigate(newPathname);
        resetTextField();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDataPageNumber]);

    return (
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <Button
                variant="contained"
                disabled={!isPreviousButtonVisible}
                sx={buttonStyle}
                onClick={previousClickHandler}
            >
                <ArrowBackIcon />
            </Button>
            <Button variant="contained" disabled={!isNextButtonVisible} sx={buttonStyle} onClick={nextClickHandler}>
                <ArrowForwardIcon />
            </Button>
        </Stack>
    );
};

export default Navigation;
