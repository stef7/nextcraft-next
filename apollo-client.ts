import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PreviewData } from "next";

require("dotenv").config();

const client = new ApolloClient({
	uri: process.env.REACT_APP_GQL_ENDPOINT,
	cache: new InMemoryCache(),
});

const getClient = (previewData?: PreviewData) => {
	if (!previewData || typeof previewData !== "string") return client;

	return new ApolloClient({
		uri: `${process.env.REACT_APP_GQL_ENDPOINT}?token=${previewData}`,
		cache: new InMemoryCache(),
	});
};

export default getClient;
