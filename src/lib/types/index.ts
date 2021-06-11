import {
	GetStaticProps,
	InferGetServerSidePropsType,
	InferGetStaticPropsType,
} from "next";

export type InferProps<PropsFn> = PropsFn extends GetStaticProps
	? InferGetStaticPropsType<PropsFn>
	: InferGetServerSidePropsType<PropsFn>;
