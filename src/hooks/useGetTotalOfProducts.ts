import axios from "axios";

import { Colors, Color, Endpoints, AxiosResponse } from "types";

import { isOffline } from "helpers";
import useMessage from "./useMessage";

import useDispatchAction from "./useDispatchAction";
import { BASE_URL } from "config";

export const useGetTotalOfProducts = () => {
    const showMessage = useMessage();

    const { setNumberOfProducts } = useDispatchAction();

    function getTotalOfProducts() {
        if (isOffline()) {
            showMessage.warning(`You have no internet connection. Try again some later`);
            return;
        }
        axios
            .get<AxiosResponse>(BASE_URL)
            .then(data => {
                const total = data.data.total;
                if (total) {
                    setNumberOfProducts(total);
                }
            })
            .catch(err => {
                showMessage.error(`Error. Can not get total number of products: ${err.message}`);
            });
    }

    return getTotalOfProducts;
};

export default useGetTotalOfProducts;
