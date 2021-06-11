import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
	const { token, uri } = req.query;

	if (Array.isArray(token)) {
		return res.status(401).json({ message: "Invalid preview token" });
	}
	if (!uri || Array.isArray(uri)) {
		return res.status(401).json({ message: "Invalid redirect URI" });
	}

	if (token) res.setPreviewData(token);

	res.redirect(uri);
};

export default handler;
