import {
	EuiPanel,
	EuiForm,
	EuiFormRow,
	EuiSpacer,
	EuiButton,
	EuiSuperSelect,
	EuiDatePicker,
	EuiHealth,
} from '@elastic/eui';
import { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { articleActions } from '../../redux/actions/articleActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { categorySelectors } from '../../redux/selectors/categorySelectors';

const SearchForm = () => {
	const location = useLocation();
	const [value, setValue] = useState<string>('');
	const [form, setForm] = useState<Record<string, Moment | undefined>>({
		fromDate: undefined,
		toDate: undefined,
	});

	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);

	const categories = useAppSelector(categorySelectors.categories);

	const options = categories.map((x) => ({
		value: x.id.toString(),
		inputDisplay: (
			<EuiHealth color={x.colorCode} style={{ lineHeight: 'inherit' }}>
				{x.name}
			</EuiHealth>
		),
		'data-test-subj': `option-${x.name}`,
	}));

	useEffect(() => {
		dispatch(
			articleActions.fetchFilterArticles(parseInt(location.state.value))
		);
	}, [dispatch, location.state.value]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			dispatch(
				articleActions.fetchFilterArticles(
					parseInt(value),
					form.fromDate?.toDate(),
					form.toDate?.toDate()
				)
			);
			setLoading(false);
			setForm({ fromDate: undefined, toDate: undefined });
			setValue('');
		} catch (error) {
			setLoading(false);
		}
	};

	const handleInputChange = (label: string, value: Moment) => {
		setForm((form) => ({ ...form, [label]: value }));
	};

	const handleFromDateChange = (date: moment.Moment) => {
		handleInputChange('fromDate', date);
	};

	const handleToDateChange = (date: moment.Moment) => {
		handleInputChange('toDate', date);
	};

	return (
		<EuiPanel style={{ padding: '2rem' }}>
			<EuiForm title='Login' component='form' onSubmit={handleSubmit}>
				<EuiFormRow label='Category' helpText='Select category' fullWidth>
					<EuiSuperSelect
						options={options}
						valueOfSelected={value}
						onChange={setValue}
					/>
				</EuiFormRow>

				<EuiFormRow label='From Date' fullWidth>
					<EuiDatePicker
						placeholder='Pick date'
						selected={form.fromDate}
						value={form.fromDate?.toString()}
						onChange={handleFromDateChange}
						fullWidth
					></EuiDatePicker>
				</EuiFormRow>
				<EuiFormRow label='To Date' fullWidth>
					<EuiDatePicker
						placeholder='Pick date'
						selected={form.toDate}
						value={form.toDate?.toString()}
						onChange={handleToDateChange}
						fullWidth
					></EuiDatePicker>
				</EuiFormRow>
				<EuiSpacer />
				<EuiButton
					type='submit'
					iconType='search'
					isLoading={loading}
					iconSide='right'
					fill
				>
					Search
				</EuiButton>
			</EuiForm>
		</EuiPanel>
	);
};

export default SearchForm;
