import React from "react";
import Image from "next/image";
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { GetStaticProps } from "next";

export default function Home({ entries }) {
	return (
		<>
			<Head>
				<title>Nextcraft</title>
			</Head>

			<main id="content" role="main">
				<h1>Nextcraft</h1>
				{entries?.map((entry) => (
					<p>{entry.title}</p>
				))}
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async function () {
	const { data } = await client.query({
		query: gql`
			query Entries {
				entries {
					title
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
