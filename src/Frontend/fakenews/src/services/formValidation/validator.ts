export type Validator = (arg: string) => boolean;

function validateEmail(text: string) {
	return text?.indexOf('@') !== -1;
}

function validatePassword(password: string, minLength = 7) {
	return password?.length >= minLength;
}

function validateUsername(username: string) {
	return /^[a-zA-Z0-9_-]+$/.test(username);
}

export const validator: Record<string, Validator> = {
	email: validateEmail,
	password: validatePassword,
	username: validateUsername,
};
