import React, { ReactNode } from "react";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "redux";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { PersistGate } from "redux-persist/integration/react";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import productsReducer from "reduxware/reducers/productsReducer";
import idReducer from "reduxware/reducers/filterSlice";
import pageSlice from "reduxware/reducers/pageSlice";
import modalReducer from "reduxware/reducers/modalSlice";
import numberOfProductsReducer from "reduxware/reducers/numberOfProductsSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["products", "id", "page", "modal", "numberOfProducts"],
};

const rootReducer = combineReducers({
    products: productsReducer,
    id: idReducer,
    page: pageSlice,
    modal: modalReducer,
    numberOfProducts: numberOfProductsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
let persistor = persistStore(store);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <SnackbarProvider
                        maxSnack={3}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        {children}
                    </SnackbarProvider>
                </Router>
            </PersistGate>
        </Provider>
    );
};

export default AppProvider;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
