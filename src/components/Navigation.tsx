import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useCallback, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useDispatchAction from "hooks/useDispatchAction";

import { getIsPreviousButtonActive, getIsNextButtonActive, getCurrentPageNumber } from "reduxware/selectors";
import { PAGE_PREFIX } from "config";
import debounce from "lodash/debounce";

const buttonStyle = {
    width: "150px",
};
const DEBOUNCE_TIME_MS = 400;
interface Props {
    resetTextField: () => void;
}

const Navigation = (props: Props) => {
    const { resetTextField } = props;
    const { showNextPage, showPreviousPage } = useDispatchAction();
    const isPreviousButtonActive = useSelector(getIsPreviousButtonActive);
    const isNextButtonActive = useSelector(getIsNextButtonActive);
    const currentDataPageNumber = useSelector(getCurrentPageNumber, shallowEqual);
    const { setFilterId } = useDispatchAction();
    const navigate = useNavigate();

    const handleClickNext = useCallback(
        debounce(() => {
            setFilterId(undefined);
            showNextPage();
            const newPathname = `${PAGE_PREFIX}${(currentDataPageNumber + 1).toString()}`;
            newPathname && navigate(newPathname);
            resetTextField();
        }, DEBOUNCE_TIME_MS),
        [currentDataPageNumber]
    );

    const handleClickPrevious = useCallback(
        debounce(() => {
            setFilterId(undefined);
            showPreviousPage();
            const newPathname = `${PAGE_PREFIX}${(currentDataPageNumber - 1).toString()}`;
            newPathname && navigate(newPathname);
            resetTextField();
        }, DEBOUNCE_TIME_MS),
        [currentDataPageNumber]
    );

    useEffect(() => {
        return () => {
            handleClickPrevious.cancel();
        };
    }, [handleClickPrevious]);

    useEffect(() => {
        return () => {
            handleClickNext.cancel();
        };
    }, [handleClickNext]);

    return (
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <Button
                variant="contained"
                disabled={!isPreviousButtonActive}
                sx={buttonStyle}
                onClick={handleClickPrevious}
                id={"Previous Button"}
            >
                <ArrowBackIcon />
            </Button>
            <Button
                variant="contained"
                disabled={!isNextButtonActive}
                sx={buttonStyle}
                onClick={handleClickNext}
                id={"Next Button"}
            >
                <ArrowForwardIcon />
            </Button>
        </Stack>
    );
};

export default Navigation;
