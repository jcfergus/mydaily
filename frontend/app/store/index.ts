import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "@/app/store/authenticationSlice";
import uiReducer from "@/app/store/uiSlice";
import authenticationApi from "@/app/store/api/authentication";
import {api as graphqlApi} from "@/app/store/api/graphqlApi";

export const store = configureStore({
    reducer: {
        [authenticationApi.reducerPath]: authenticationApi.reducer,
        [graphqlApi.reducerPath]: graphqlApi.reducer,
        authentication: authenticationReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authenticationApi.middleware).concat(graphqlApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
