import uuid from "react-uuid";
import Stack from "@mui/material/Stack";
import loadable from "@loadable/component";

import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/Header";

import { Paths } from "./routes";
import { fetchColors } from "hooks/fetchColors";
import {
    areProductsNotEmpty,
    getArrayOfPageNumbers,
    getNumberOfProducts,
    getCurrentPageNumber,
    getId,
} from "reduxware/selectors";
import { Home } from "./components/Home";
import { createEndpointsArrayArgs } from "./types";
import { useFetchProducts, useGetEndpoints } from "./hooks";
import useGetTotalOfProducts from "hooks/useGetTotalOfProducts";

const Modal = loadable(() => import("./components/Modal"));
const ColorsTable = loadable(() => import("./components/ColorsTable"));
const NotFound = loadable(() => import("./components/NotFound"));
const ColorsLayout = loadable(() => import("./components/ColorsLayout"));
const Colors = loadable(() => import("./components/Colors"));

// const initialEndpoints: createEndpointsArrayArgs = { pageNumber: 1, id: undefined, totalNumberOfProducts: 12 };

function App() {
    const navigate = useNavigate();
    const pageNumbers = useSelector(getArrayOfPageNumbers);
    const readyToRedirect = useSelector(areProductsNotEmpty);
    const getTotalOfProducts = useGetTotalOfProducts();
    const endpoints = useGetEndpoints();
    const fetchProducts = useFetchProducts();

    useEffect(() => {
        readyToRedirect && navigate(Paths.first);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [readyToRedirect]);

    useEffect(() => {
        getTotalOfProducts();
    }, []);

    useEffect(() => {
        //endpoints && fetchColors(enqueueSnackbar);

        endpoints && endpoints.length && fetchProducts(endpoints);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endpoints]);

    return (
        <Stack spacing={6} alignItems="center" justifyContent="center" marginBottom="24">
            <Header />
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="/colors" element={<ColorsLayout />}>
                        <Route index element={<Colors />}></Route>
                        {pageNumbers.map(item => (
                            <Route path={item.toString()} element={<ColorsTable pageNumber={item} />} key={uuid()} />
                        ))}
                    </Route>
                </Route>
                <Route path={Paths.nopage} element={<NotFound />} />
            </Routes>
            <Modal />
        </Stack>
    );
}

export default App;
