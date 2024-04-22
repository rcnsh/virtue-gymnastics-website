import type { FC } from "react";

interface EmailTemplateProps {
	Name: string;
	Email: string;
	Message: string;
}

export const EmailTemplate: FC<Readonly<EmailTemplateProps>> = ({
	Name,
	Email,
	Message,
}) => (
	<div>
		<h1>New message from {Name}:</h1>
		<h2>From: {Email}</h2>
		<p>{Message}</p>
	</div>
);
