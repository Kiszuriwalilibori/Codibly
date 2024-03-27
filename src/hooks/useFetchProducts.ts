import axios from "axios";

import { Products, Product, Endpoints } from "types";

import { isOffline } from "helpers";
import { useDispatchAction, useMessage } from "hooks";

export const useFetchProducts = () => {
    const showMessage = useMessage();
    const products: Products = [];
    const { setProducts } = useDispatchAction();

    function fetchProducts(endpoints: Endpoints) {
        if (isOffline()) {
            showMessage.warning(`You have no internet connection. Try again some later`);
            return;
        }

        axios
            .all(endpoints.map(endpoint => axios.get(endpoint)))
            .then(data => {
                data.forEach((item: { data: { data: Product } }) => {
                    const product = item.data.data as Product;
                    products.push(product);
                });
            })
            .then(() => {
                products.length && setProducts(products);
            })
            .catch(err => {
                if (err.response) {
                    showMessage.error(`Error. The client was given an error response (5xx, 4xx)  ${err.message} `);
                } else if (err.request) {
                    showMessage.error(
                        `Error. The client never received a response, and the request was never left  ${err.message} `
                    );
                } else {
                    showMessage.error(`Error.  ${err.message} `);
                }
            });
    }
    return fetchProducts;
};

export default useFetchProducts;
