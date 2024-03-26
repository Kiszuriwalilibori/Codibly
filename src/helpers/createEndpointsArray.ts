import { createEndpointsArrayArgs } from "types";
import { BASE_URL, PRODUCTS_PER_PAGE } from "../config";

export const createEndpointsArray = (args: createEndpointsArrayArgs) => {
    const { pageNumber, id, totalNumberOfProducts } = args;

    if (totalNumberOfProducts) {
        if (pageNumber && !id) {
            const result = [] as string[];
            let firstProductIndex = (pageNumber - 1) * PRODUCTS_PER_PAGE + 1;
            if (firstProductIndex + PRODUCTS_PER_PAGE > totalNumberOfProducts) {
                firstProductIndex = totalNumberOfProducts - PRODUCTS_PER_PAGE + 1;
            }

            let productIndex = 0;
            let counter = 0;
            do {
                productIndex = firstProductIndex + counter;
                result.push(`${BASE_URL}/${productIndex}`);
                counter++;
            } while (counter < PRODUCTS_PER_PAGE && productIndex < totalNumberOfProducts);
            return result;
        }
        if (id) {
            return [`${BASE_URL}/${id}`];
        }
    }
    return [];
};

export default createEndpointsArray;
