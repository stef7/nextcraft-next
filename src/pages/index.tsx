import React from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { GetStaticProps } from "next";
import { HomeQuery } from "../generated/graphql-types";
import { useApp } from "./_app";
import { InferProps } from "../lib/types";
import getClient from "../../apollo-client";

export default function Home({
	data,
	preview,
}: InferProps<typeof getStaticProps>) {
	const app = useApp();
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Nextcraft</title>
			</Head>

			<main id="content" role="main">
				<h1>Nextcraft</h1>

				{data?.entries.map((entry) => (
					<p key={entry.uid}>
						Entry title from Craft CMS: <br />
						{entry.title}
					</p>
				))}
			</main>

			<button
				type="button"
				onClick={() => {
					app.setState({
						...app.state,
						num: app.state.num < 10 ? app.state.num + 1 : 1,
					});
				}}
			>
				State: {app.state.num}
			</button>

			{preview && (
				<button
					style={{ position: "absolute", top: "1rem", right: "1rem" }}
					type="button"
					onClick={() => router.push("/api/preview-exit")}
				>
					Exit preview
				</button>
			)}
		</>
	);
}

export const getStaticProps: GetStaticProps<{
	data: HomeQuery;
	preview: boolean;
}> = async function ({ preview = false, previewData }) {
	const { data } = await getClient(previewData).query<HomeQuery>({
		query: gql`
			query HomeQuery {
				entries {
					title
					uid
				}
			}
		`,
	});

	return {
    props: {
      data,
      preview,
    },
    revalidate: 60,
  };
};
