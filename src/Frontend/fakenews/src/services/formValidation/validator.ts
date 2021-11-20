export type Validator = (arg: string) => boolean;

function validateEmail(text: string) {
	return text?.indexOf('@') !== -1;
}

function validatePassword(password: string) {
	return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-,.])[A-Za-z\d@$!%*?&-,.]{7,}$/.test(
		password
	);
}

function validateUsername(username: string) {
	return /^[a-zA-Z0-9_-]+$/.test(username);
}

export const validator: Record<string, Validator> = {
	email: validateEmail,
	password: validatePassword,
	username: validateUsername,
};
