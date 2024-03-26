import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "types";

const initialState = { value: undefined as undefined | number };

const numberOfProducts = createSlice({
    name: "numberOfProducts",
    initialState,
    reducers: {
        setNumberOfProducts(state, action) {
            state.value = action.payload;
        },
    },
});
export default numberOfProducts.reducer;
export const { setNumberOfProducts } = numberOfProducts.actions;
export const getNumberOfProducts = (state: RootStateType) => state.numberOfProducts.value;
