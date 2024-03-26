import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { areProductsNotEmpty } from "reduxware/selectors";
import { Paths } from "routes";
const Products = () => {
    const isReadyToShowProducts = useSelector(areProductsNotEmpty);
    const navigate = useNavigate();

    useEffect(() => {
        isReadyToShowProducts && navigate(Paths.first);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReadyToShowProducts]);

    return null;
};

export default Products;
