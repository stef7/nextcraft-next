import { ApolloClient, InMemoryCache } from "@apollo/client";

require("dotenv").config();

const client = new ApolloClient({
	uri: process.env.REACT_APP_GQL_ENDPOINT,
	cache: new InMemoryCache(),
});

export default client;
