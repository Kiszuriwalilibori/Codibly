import uuid from "react-uuid";
import Stack from "@mui/material/Stack";
import loadable from "@loadable/component";

import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Paths } from "./routes";
import { areProductsNotEmpty, getArrayOfPageNumbers, getId } from "reduxware/selectors";
import { Header, Home } from "./components";
import { useFetchProducts, useGetEndpoints, useGetNumberOfProducts } from "./hooks";
import { DOMAIN_NAME, PAGE_PREFIX, PRODUCT_PREFIX } from "config/config";

const Modal = loadable(() => import("./components/DetailsModal"));
const ProductsTable = loadable(() => import("./components/ProductsTable"));
const NotFound = loadable(() => import("./components/NotFound"));
const ProductsLayout = loadable(() => import("./components/MainLayout"));
const Products = loadable(() => import("./components/Products"));

function App() {
    const navigate = useNavigate();
    const pageNumbers = useSelector(getArrayOfPageNumbers);
    const readyToRedirect = useSelector(areProductsNotEmpty);
    const id = useSelector(getId);
    const getNumberOfProducts = useGetNumberOfProducts();
    const endpoints = useGetEndpoints();
    const fetchProducts = useFetchProducts();

    useEffect(() => {
        readyToRedirect && navigate(Paths.first);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [readyToRedirect]);

    useEffect(() => {
        getNumberOfProducts();
    }, []);

    useEffect(() => {
        endpoints && endpoints.length && fetchProducts(endpoints);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endpoints]);

    return (
        <Stack spacing={6} alignItems="center" justifyContent="center" marginBottom="24">
            <Header />
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path={`/${DOMAIN_NAME}`} element={<ProductsLayout />}>
                        <Route index element={<Products />}></Route>
                        {pageNumbers.map(item => (
                            <Route
                                path={
                                    !id
                                        ? `${PAGE_PREFIX}${item.toString()}`
                                        : `${PAGE_PREFIX}${item.toString()}${PRODUCT_PREFIX}${id}`
                                }
                                element={<ProductsTable pageNumber={item} />}
                                key={uuid()}
                            />
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
