import { createAction } from "@reduxjs/toolkit";
import { Products } from "types";

export const clearColors = createAction("COLORS_CLEAR");
export const setColors = createAction<Products>("COLORS_SET");
export const completeFetch = createAction("FETCH_COMPLETED");

export { setFilterId } from "../reducers/filterSlice";
export { showNextPage, showPreviousPage, showCertainPage } from "../reducers/pageSlice";
export { showModal, hideModal } from "../reducers/modalSlice";
export { setNumberOfProducts } from "../reducers/numberOfProductsSlice";
