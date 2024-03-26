import { createReducer } from "@reduxjs/toolkit";
import { Products, RootStateType } from "types";
import { setProducts, clearProducts } from "../actionCreators";

const initialState = { items: [] as Products };

const productsReducer = createReducer(initialState, builder => {
    builder.addCase(setProducts, (state, action) => {
        if (action.payload) {
            state.items = action.payload;
        }
    });

    builder.addCase(clearProducts, state => {
        state.items = [];
    });
});

export default productsReducer;
export const getProducts = (state: RootStateType) => state.products.items;
