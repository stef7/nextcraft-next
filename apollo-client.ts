import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PreviewData } from "next";

require("dotenv").config();

const getCache = () =>
  new InMemoryCache({
    resultCaching: false,
    typePolicies: {
      ElementInterface: {
        keyFields: ["id", "uid"],
      },
    },
  });

const client = new ApolloClient({
  uri: process.env.REACT_APP_GQL_ENDPOINT,
  cache: getCache(),
});

const getClient = (previewData?: PreviewData) => {
  if (!previewData || typeof previewData !== "string") return client;

  return new ApolloClient({
    uri: `${process.env.REACT_APP_GQL_ENDPOINT}?token=${previewData}`,
    cache: getCache(),
  });
};

export default getClient;
