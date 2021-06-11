import React from "react";
import Image from "next/image";
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { GetStaticProps } from "next";
import { HomeQuery } from "../generated/graphql-types";
import { useApp } from "./_app";
import { InferProps } from "../lib/types";

export default function Home({ entries }: InferProps<typeof getStaticProps>) {
	const app = useApp();

	return (
		<>
			<Head>
				<title>Nextcraft</title>
			</Head>

			<main id="content" role="main">
				<h1>Nextcraft</h1>

				{entries.map((entry) => (
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
		</>
	);
}

export const getStaticProps: GetStaticProps<HomeQuery> = async function () {
	const { data } = await client.query<HomeQuery>({
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
		props: data,
	};
};
