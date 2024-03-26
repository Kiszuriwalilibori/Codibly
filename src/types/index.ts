type StringKeyObject = {
    [key: string]: number | string;
};
export interface Product extends StringKeyObject {
    id: number;
    name: string;
    year: number;
    color: string;
    panton_value: string;
}
export type Products = Product[];

export interface ModalItem {
    name: string;
    value: string | number;
}

export type PathKeys = "main" | "nopage" | "first" | "previous";

export { RootStateType } from "../components/AppProvider";

export interface createEndpointsArrayArgs {
    pageNumber: number | undefined;
    id: number | undefined;
    totalNumberOfProducts: number | undefined;
}

export type Endpoints = string[];

export type AxiosResponse = {
    data: Product[];
    total: number;
};
