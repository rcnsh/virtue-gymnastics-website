/* boilerplate */

import Document, { Head, Html, Main, NextScript } from "next/document";

/**
 * Custom Document component for Next.js.
 * This component is used to augment the application's <html> and <body> tags.
 */
export default class _Document extends Document {
	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
