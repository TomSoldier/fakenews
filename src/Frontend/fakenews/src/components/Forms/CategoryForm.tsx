import React, { useState } from 'react';
import {
	EuiButton,
	EuiColorPicker,
	EuiFieldText,
	EuiForm,
	EuiFormRow,
	EuiSpacer,
	useColorPickerState,
} from '@elastic/eui';
import { validator } from '../../services/formValidation/validator';
import { useAppDispatch } from '../../redux/hooks';
import { categoryActions } from '../../redux/actions/categoryActions';

export const CategoryForm = React.memo(() => {
	const dispatch = useAppDispatch();
	const [form, setForm] = useState<Record<string, string>>({
		categoryName: '',
	});

	const [loading, setLoading] = useState(false);
	const [color, setColor] = useColorPickerState('#FFF');

	const [errors, setErrors] = useState<Record<string, boolean | string>>({});
	const validateInput = (label: string, value: string) => {
		const isValid = validator?.[label] ? validator?.[label]?.(value) : true;
		setErrors({ ...errors, [label]: !isValid });
	};

	const handleInputChange = (label: string, value: string) => {
		validateInput(label, value);
		setForm({ ...form, [label]: value });
	};

	const requestCreateCategory = (categoryName: string) => {
		dispatch(categoryActions.createCategory(categoryName, color));
		dispatch(categoryActions.fetchCategories());
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		setLoading(true);
		Object.keys(form).forEach((label) => validateInput(label, form[label]));
		if (!Object.values(form).every((value) => Boolean(value))) {
			setErrors({
				...errors,
				form: 'Please fill every fields.',
			});
			setLoading(false);
			return;
		}

		requestCreateCategory(form.categoryName);
		setLoading(false);
		setErrors({});
		setForm({ categoryName: '' });
	};

	return (
		<EuiForm
			title='Create new category'
			component='form'
			onSubmit={handleSubmit}
			isInvalid={Boolean(errors.form)}
			error={[errors.form]}
		>
			<EuiFormRow
				label='Name'
				helpText='Enter category name.'
				isInvalid={Boolean(errors.categoryName)}
				error='Category name field must be filled.'
				fullWidth
			>
				<EuiFieldText
					icon='tag'
					placeholder='Sport'
					value={form.categoryName}
					onChange={(e) => handleInputChange('categoryName', e.target.value)}
					isInvalid={Boolean(errors.categoryName)}
					fullWidth
				/>
			</EuiFormRow>
			<EuiFormRow
				label='Color picker'
				helpText='This color picker is inside of a form row'
				fullWidth
			>
				<EuiColorPicker color={color} onChange={setColor} fullWidth />
			</EuiFormRow>
			<EuiSpacer />
			<EuiButton type='submit' isLoading={loading} iconSide='right' fill>
				Create
			</EuiButton>
		</EuiForm>
	);
});
