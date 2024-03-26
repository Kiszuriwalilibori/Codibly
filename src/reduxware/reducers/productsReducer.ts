import { createReducer } from "@reduxjs/toolkit";

import { Products, RootStateType } from "types";
import { setColors, clearColors } from "../actionCreators";

const initialState = { items: [] as Products };

const productsReducer = createReducer(initialState, builder => {
    builder.addCase(setColors, (state, action) => {
        if (action.payload) {
            state.items = action.payload;
        }
    });

    builder.addCase(clearColors, state => {
        state.items = [];
    });
});

export default productsReducer;
export const getProducts = (state: RootStateType) => state.colors.items;
