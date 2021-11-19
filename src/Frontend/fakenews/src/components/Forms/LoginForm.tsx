import React from 'react';
import {
	EuiButton,
	EuiFieldText,
	EuiForm,
	EuiFormRow,
	EuiFieldPassword,
	EuiSpacer,
	EuiPanel,
} from '@elastic/eui';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { validator } from '../../services/formValidation/validator';
import { userActions } from '../../redux/actions/userActions';
import { useAppDispatch } from '../../redux/hooks';
import { endpoints } from '../../configuration/api';

export const LoginForm = React.memo(() => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const [form, setForm] = React.useState<Record<string, string>>({
		email: '',
		password: '',
	});

	const [errors, setErrors] = React.useState<Record<string, boolean | string>>(
		{}
	);
	const validateInput = (label: string, value: string) => {
		const isValid = validator?.[label] ? validator?.[label]?.(value) : true;
		setErrors({ ...errors, [label]: !isValid });
	};

	const handleInputChange = (label: string, value: string) => {
		validateInput(label, value);
		setForm({ ...form, [label]: value });
	};

	const requestUserLogin = (email: string, password: string) => {
		axios
			.post<TokenDto>(endpoints.Users.login, {
				data: { email, password },
			})
			.then((response) => {
				dispatch(userActions.loginUser(response.data));
				navigate(location.state?.from?.pathname || '/', { replace: true });
			})
			.catch((error) => {
				setErrors({
					...errors,
					form:
						error.response && error.response.data
							? error.response.data.errorMessage
							: 'Something went wrong',
				});
			});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		Object.keys(form).forEach((label) => validateInput(label, form[label]));
		if (!Object.values(form).every((value) => Boolean(value))) {
			setErrors({
				...errors,
				form: 'Please fill every fields.',
			});
			return;
		}

		requestUserLogin(form.email, form.password);
	};

	return (
		<EuiPanel style={{ padding: '2rem' }}>
			<EuiForm
				title='Login'
				component='form'
				onSubmit={handleSubmit}
				isInvalid={Boolean(errors.form)}
				error={[errors.form]}
			>
				<EuiFormRow
					label='Email'
					helpText='Enter your email address.'
					isInvalid={Boolean(errors.email)}
					error='Enter a valid email address.'
					fullWidth
				>
					<EuiFieldText
						icon='email'
						placeholder='user@gmail.com'
						value={form.email}
						onChange={(e) => handleInputChange('email', e.target.value)}
						aria-label='Enter your email address.'
						isInvalid={Boolean(errors.email)}
						fullWidth
					/>
				</EuiFormRow>

				<EuiFormRow
					label='Password'
					helpText='Enter your password.'
					isInvalid={Boolean(errors.password)}
					error='The password must be at least 7 characters long.'
					fullWidth
				>
					<EuiFieldPassword
						placeholder='••••••••••••'
						value={form.password}
						onChange={(e) => handleInputChange('password', e.target.value)}
						type='dual'
						aria-label='Enter your password.'
						isInvalid={Boolean(errors.password)}
						fullWidth
					/>
				</EuiFormRow>
				<EuiSpacer />
				<EuiButton type='submit' fill>
					Login
				</EuiButton>
			</EuiForm>

			<EuiSpacer size='xl' />

			<div style={{ fontSize: '0.8rem' }}>
				Don`t have account? <Link to='/registration'> Register now</Link>
			</div>
		</EuiPanel>
	);
});
