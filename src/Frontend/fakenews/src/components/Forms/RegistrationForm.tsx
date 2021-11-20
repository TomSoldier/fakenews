import React from 'react';
import {
	EuiButton,
	EuiCheckbox,
	EuiFieldText,
	EuiForm,
	EuiFormRow,
	EuiFieldPassword,
	EuiSpacer,
	htmlIdGenerator,
	EuiPanel,
} from '@elastic/eui';
import { Link, useNavigate } from 'react-router-dom';
import { delay } from 'lodash';
import axios from 'axios';
import { useAppDispatch } from '../../redux/hooks';
import { baseURL, endpoints } from '../../configuration/api';
import { eventActions } from '../../redux/actions/eventActions';
import {
	createEvent,
	FakeNewsEventType,
} from '../../services/events/fakeNewsEvent';
import { validator } from '../../services/formValidation/validator';

export const RegistrationForm = React.memo(() => {
	const [form, setForm] = React.useState<Record<string, string>>({
		username: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});
	const [agreedToTerms, setAgreedToTerms] = React.useState(false);
	const [errors, setErrors] = React.useState<Record<string, string | boolean>>(
		{}
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const validateInput = (label: string, value: string) => {
		const isValid = validator?.[label] ? validator?.[label]?.(value) : true;
		setErrors((errors) => ({ ...errors, [label]: !isValid }));
	};

	const handleRedirect = () => {
		navigate('/login');
	};

	const requestUserRegister = (
		username: string,
		email: string,
		password: string
	) => {
		axios
			.post(baseURL + endpoints.Users.register, {
				data: { username, email, password },
			})
			.then(() => {
				dispatch(
					eventActions.addEvent(
						createEvent(FakeNewsEventType.RegistrationSuccess)
					)
				);
				setForm({
					username: '',
					email: '',
					password: '',
					passwordConfirm: '',
				});
				delay(handleRedirect, 3000);
			})
			.catch((error) => {
				setErrors((errors) => ({
					...errors,
					form: error.response?.data?.errorMessage ?? 'Something went wrong',
				}));
			});
	};

	const setAgreedToTermsCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAgreedToTerms(e.target.checked);
	};

	const handleInputChange = (label: string, value: string) => {
		validateInput(label, value);

		setForm((form) => ({ ...form, [label]: value }));
	};

	const handlePasswordConfirmChange = (value: string) => {
		setErrors((errors) => ({
			...errors,
			passwordConfirm: form.password !== value ? 'Passwords do not match.' : '',
		}));

		setForm((form) => ({ ...form, passwordConfirm: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		Object.keys(form).forEach((label) => validateInput(label, form[label]));
		if (!Object.values(form).every((value) => Boolean(value))) {
			setErrors((errors) => ({
				...errors,
				form: 'You must fill out all fields.',
			}));
			return;
		}

		if (form.password !== form.passwordConfirm) {
			setErrors((errors) => ({ ...errors, form: 'Passwords do not match.' }));
			return;
		}

		if (!agreedToTerms) {
			setErrors((errors) => ({
				...errors,
				form: 'You must agree to the terms and conditions.',
			}));
			return;
		}

		requestUserRegister(form.username, form.email, form.password);
	};

	return (
		<EuiPanel style={{ padding: '2rem' }}>
			<EuiForm
				component='form'
				onSubmit={handleSubmit}
				isInvalid={Boolean(errors.form)}
				error={[errors.form]}
			>
				<EuiFormRow
					label='Username'
					isInvalid={Boolean(errors.username)}
					fullWidth
				>
					<EuiFieldText
						icon='user'
						placeholder='Username'
						value={form.username}
						onChange={(e) => handleInputChange('username', e.target.value)}
						isInvalid={Boolean(errors.username)}
						fullWidth
					/>
				</EuiFormRow>
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
				<EuiFormRow
					label='Confirm password'
					helpText='Enter your password again.'
					isInvalid={Boolean(errors.passwordConfirm)}
					fullWidth
					error='Passwords do not match.'
				>
					<EuiFieldPassword
						placeholder='••••••••••••'
						value={form.passwordConfirm}
						onChange={(e) => handlePasswordConfirmChange(e.target.value)}
						type='dual'
						aria-label='Confirm password.'
						isInvalid={Boolean(errors.passwordConfirm)}
						fullWidth
					/>
				</EuiFormRow>
				<EuiSpacer />
				<EuiCheckbox
					id={htmlIdGenerator()()}
					label='I accept the terms and conditions.'
					checked={agreedToTerms}
					onChange={(e) => setAgreedToTermsCheckbox(e)}
				/>
				<EuiSpacer />
				<EuiButton type='submit' fill>
					Register
				</EuiButton>
			</EuiForm>

			<EuiSpacer size='xl' />

			<div style={{ fontSize: '0.8rem' }}>
				Already have an account? <Link to='/login'> Login</Link>
			</div>
		</EuiPanel>
	);
});
