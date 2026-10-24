interface EmailTemplateProps {
	Name: string;
	Email: string;
	Message: string;
}

export const EmailTemplate = ({
	Name,
	Email,
	Message,
}: Readonly<EmailTemplateProps>) => (
	<div>
		<h1>New message from {Name}:</h1>
		<h2>From: {Email}</h2>
		<p>{Message}</p>
	</div>
);
