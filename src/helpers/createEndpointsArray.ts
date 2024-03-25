import { BASE_URL, PRODUCTS_TOTAL, PRODUCTS_PER_PAGE } from "../config";

interface Args {
    pageNumber: number | undefined;
    id: number | undefined;
}

export const createEndpointsArray = (args: Args) => {
    const { pageNumber, id } = args;
    if (pageNumber) {
        const result = [] as string[];
        let firstProductIndex = (pageNumber - 1) * PRODUCTS_PER_PAGE + 1;
        let productIndex = 0;
        let counter = 0;
        do {
            productIndex = firstProductIndex + counter;
            result.push(`${BASE_URL}/${productIndex}`);
            counter++;
            console.log(productIndex);
        } while (counter < PRODUCTS_PER_PAGE && productIndex < PRODUCTS_TOTAL);
        return result;
    }
    if (id) {
        return `${BASE_URL}/${id}`;
    }
    return null;
};

export default createEndpointsArray;
