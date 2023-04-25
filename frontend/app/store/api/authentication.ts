import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { retry } from "@reduxjs/toolkit/query/react";
import type User from "@/lib/models/user";

export interface LoginResponse {
    user: User,
    token: string,
}

export interface SignUpResponse {
    user?: User;
    token: string;
}

export interface LoginRequest {
    email: string,
    password: string,
}

export interface SignUpRequest {
    email: string,
    password: string,
    givenName?: string,
    surname?: string,
}

export const authenticationApi = createApi({
    reducerPath: 'authenticationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth' }),
    endpoints: (build) => ({
        logIn: build.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
               url: 'login',
               method: 'POST',
               body: credentials,
            }),
            extraOptions: {
                backoff: () => {
                    retry.fail({fake: 'error' })
                }
            }
        }),
        signUp: build.mutation<SignUpResponse, SignUpRequest>({
            query: (user) => ({
                url: 'signup',
                method: 'POST',
                body: user,
            })
        }),
        refresh: build.query<LoginResponse, void>({
            query: () => ({ url: `refresh`})
        })
    })
})

export const { useLogInMutation, useSignUpMutation, useRefreshQuery } = authenticationApi;

export const {
    endpoints: { logIn, signUp, refresh },
} = authenticationApi;

export default authenticationApi;