import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { areProductsNotEmpty } from "reduxware/selectors";
import { Paths } from "routes";
const Colors = () => {
    const readyToRedirect = useSelector(areProductsNotEmpty);
    const navigate = useNavigate();

    useEffect(() => {
        readyToRedirect && navigate(Paths.first);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [readyToRedirect]);

    return null;
};

export default Colors;
