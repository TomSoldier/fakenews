import { Role } from './Role';

export interface TokenDetails {
	name: string;
	jti: string;
	role: Role;
	exp: number;
	iss: string;
	aud: string;
	userid: string;
}
