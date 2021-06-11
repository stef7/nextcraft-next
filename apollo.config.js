/* jshint esversion: 10 */
const dotenv = require("dotenv");

dotenv.config();

const endpoint = process.env.REACT_APP_GQL_ENDPOINT;
if (!endpoint) {
	const error = new Error("CMS GraphQL Endpoint not defined");
	console.error(error);
	throw error;
}

module.exports = {
	client: {
		service: {
			name: "CraftCMS",
			url: endpoint,
			skipSSLValidation: true,
		},
	},
};
