import axios from "axios";

import { useDispatchAction, useMessage } from "hooks";
import { AxiosResponse } from "types";
import { isOffline } from "helpers";
import { BASE_URL } from "config/config";

export const useGetNumberOfProducts = () => {
    const showMessage = useMessage();
    const { setNumberOfProducts } = useDispatchAction();

    function getNumberOfProducts() {
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

    return getNumberOfProducts;
};

export default useGetNumberOfProducts;
