import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import api from "@/app/store/api/authentication";
import { client as graphQLClient } from "./api/graphqlApi";
import User from "@/lib/models/user";

interface AuthenticationState {
    loggedIn: boolean;
    token?: string;
    user?: User;
    loading: boolean;
}

const initialState: AuthenticationState = {
    loggedIn: false,
    user: undefined,
    token: undefined,
    loading: false,
} as AuthenticationState;

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        logOut: (state) => {
            state.loggedIn = false;
            state.user = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.logIn.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                graphQLClient.setHeader('authentication', `Bearer ${payload.token}`);
                state.user = payload.user;
                state.loggedIn = true;
                state.loading = false;
            }
        ).addMatcher(
            api.endpoints.logIn.matchRejected,
            (state, {payload}) => {
                state.token = undefined;
                graphQLClient.setHeader('authentication', ``);
                state.user = undefined;
                state.loggedIn = false;
                state.loading = false;
            }
        ).addMatcher(
            api.endpoints.logIn.matchPending,
            (state) => {
                state.loading = true;
            }
        ).addMatcher(
            api.endpoints.signUp.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                graphQLClient.setHeader('authentication', `Bearer ${payload.token}`);
                state.user = payload.user;
                state.loggedIn = true;
                state.loading = false;
            }
        ).addMatcher(
            api.endpoints.signUp.matchRejected,
            (state, { payload }) => {
                state.token = undefined;
                graphQLClient.setHeader('authentication', ``);
                state.user = undefined;
                state.loggedIn = false;
                state.loading = false;
            }
        ).addMatcher(
            api.endpoints.signUp.matchPending,
            (state) => {
                state.loading = true;
            }

        ).addMatcher(
            api.endpoints.refresh.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                graphQLClient.setHeader('authentication', `Bearer ${payload.token}`);
                state.user = payload.user;
                state.loggedIn = true;
                state.loading = false;
            }
        ).addMatcher(api.endpoints.refresh.matchRejected,
            (state, { payload }) => {
                state.token = undefined;
                graphQLClient.setHeader('authentication', ``);
                state.user = undefined;
                state.loggedIn = false;
                state.loading = false;
            }
        ).addMatcher(
            api.endpoints.refresh.matchPending,
            (state) => {
                state.loading = true;
            }
        );
    }
});

export const { logOut } = authenticationSlice.actions;

export const selectUser = (state: RootState) => state.authentication.user;
export const selectIsLoggedIn = (state: RootState) => state.authentication.loggedIn;

export default authenticationSlice.reducer;