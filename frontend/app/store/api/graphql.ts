import {createApi} from "@reduxjs/toolkit/query/react";
import {graphqlRequestBaseQuery} from "@rtk-query/graphql-request-base-query";
import {GraphQLClient} from "graphql-request";

export const client = new GraphQLClient("/graphql");

export const graphqlApi = createApi({
    reducerPath: 'graphqlApi',
    baseQuery: graphqlRequestBaseQuery({client}),
    endpoints: () => ({})
})

export const {} = graphqlApi;

export default graphqlApi;