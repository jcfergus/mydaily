import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:3000/graphql",
    documents: "./app/store/api/graphql/*.graphql",
    generates: {
        "./app/store/api/generated/": {
            preset: "client",
            plugins: [{
                typescript: {
                    "typescript-resolvers": {
                        "typescript-rtk-query": {
                            importBaseApiFrom: '@/app/store/graphql',
                            exportHooks: true,
                            overrideExisting: true,
                        }
                    }
                }
            }],
        },
        "./graphql.schema.json": {
            plugins: ["introspection"]
        }
    }
};

export default config;
