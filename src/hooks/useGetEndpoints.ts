import createEndpointsArray from "helpers/createEndpointsArray";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { getCurrentPageNumber, getId, getNumberOfProducts } from "reduxware/selectors";

export const useGetEndpoints = () => {
    const currentPage = useSelector(getCurrentPageNumber);
    const id = useSelector(getId);
    const numberOfProducts = useSelector(getNumberOfProducts);

    const endpoints = useMemo(
        () => createEndpointsArray({ pageNumber: currentPage, id, totalNumberOfProducts: numberOfProducts }),
        [currentPage, id, numberOfProducts]
    );
    return endpoints;
};

export default useGetEndpoints;
