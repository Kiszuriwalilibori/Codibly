import { createSelector } from "@reduxjs/toolkit";
import { fieldTolabel } from "helpers";
import { getProducts } from "../reducers/colorsReducer";
import { getId } from "../reducers/filterSlice";
import { getCurrentPageNumber } from "../reducers/pageSlice";
import { getNumberOfProducts } from "../reducers/numberOfProductsSlice";
import { getModalColorId, getIsModalVisible } from "../reducers/modalSlice";
import { Products, ModalItem } from "types";
import { PRODUCTS_PER_PAGE } from "config";

const setAreProductsNotEmpty = (ary: Products): boolean => {
    return ary.length ? true : false;
};

function setIsPreviousButtonVisible(currentIndex: number) {
    if (currentIndex > 1) {
        return true;
    } else {
        return false;
    }
}

export const setIsNextButtonVisible = (numberOfProducts: number | undefined, currentIndex: number) => {
    if (numberOfProducts && currentIndex < Math.ceil(numberOfProducts / PRODUCTS_PER_PAGE)) {
        return true;
    } else {
        return false;
    }
};
const setSelectedColorModalData = (ary: Products, id: number) => {
    const color = ary.find(item => item.id === id);
    if (color) {
        const result: ModalItem[] = [];
        const x = Object.entries(color);

        x.forEach(item => {
            item[0] = fieldTolabel(item[0]);
            const obj = { name: item[0], value: item[1] };
            result.push(obj);
        });
        return result;
    } else {
        return undefined;
    }
};

export const setArrayOfPageNumbers = (nmbr: number) => {
    const result: number[] = [];
    for (let i = 1; i <= nmbr; i++) {
        result.push(i);
    }
    return result;
};
export const createArrayOfPageNumbers = (numberOfProducts: number | undefined) => {
    const result: number[] = [];
    if (numberOfProducts) {
        for (let i = 1; i <= Math.ceil(numberOfProducts / PRODUCTS_PER_PAGE); i++) {
            result.push(i);
        }
    }
    return result;
};

export const setProductsIDs = (ary: Products) => {
    const result: number[] = [];
    ary.forEach(item => result.push(item.id));

    return result;
};

export const areProductsNotEmpty = createSelector(getProducts, setAreProductsNotEmpty);
export const getIsPreviousButtonActive = createSelector(getCurrentPageNumber, setIsPreviousButtonVisible);
export const getIsNextButtonActive = createSelector(getNumberOfProducts, getCurrentPageNumber, setIsNextButtonVisible);
export const getSelectedProductModalData = createSelector(getProducts, getModalColorId, setSelectedColorModalData);
export const getArrayOfPageNumbers = createSelector(getNumberOfProducts, createArrayOfPageNumbers);
export const getProductsIDs = createSelector(getProducts, setProductsIDs);

export { getCurrentPageNumber };
export { getIsModalVisible };
export { getProducts };
export { getNumberOfProducts };
export { getId };
