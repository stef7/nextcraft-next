import React from "react";
import Image from "next/image";
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Entries } from "../generated/graphql-types";

export default function Home({
	entries,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
		</>
	);
}

export const getStaticProps: GetStaticProps<{
	entries: Entries["entries"];
}> = async function () {
	const { data } = await client.query<Entries>({
		query: gql`
			query Entries {
				entries {
					title
					uid
				}
			}
		`,
	});

	return {
		props: {
			entries: data.entries,
		},
	};
};
