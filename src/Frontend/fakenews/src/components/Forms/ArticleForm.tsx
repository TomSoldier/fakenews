import {
	EuiSwitchEvent,
	EuiForm,
	EuiFlexGroup,
	EuiFlexItem,
	EuiText,
	EuiSpacer,
	EuiPanel,
	EuiFormRow,
	EuiFieldText,
	EuiDatePicker,
	EuiSwitch,
	EuiButton,
} from '@elastic/eui';
import { Moment } from 'moment';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { CategoryDto } from '../../models/DTO/CategoryDto';
import { articleActions } from '../../redux/actions/articleActions';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { articleSelectors } from '../../redux/selectors/articleSelectors';
import { categorySelectors } from '../../redux/selectors/categorySelectors';
import ArticleEditor from '../Editor/ArticleEditor';
import MultiSelect from '../Select/MultiSelect';

const ArticleForm = () => {
	const categories = useAppSelector(categorySelectors.categories);
	const [checked, setChecked] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const selectedCategories = useAppSelector(articleSelectors.categories);
	const title = useAppSelector(articleSelectors.title);

	const validToDate = useAppSelector(articleSelectors.validTo);
	const htmlContent = useAppSelector(articleSelectors.content);
	const article = useAppSelector(articleSelectors.fullArticle);

	const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(articleActions.saveTitle(e.target.value));
	};

	const onCheckChange = (event: EuiSwitchEvent) => {
		setChecked(event.target.checked);
		dispatch(articleActions.saveShownOnHomepage(event.target.checked));
	};

	const onChange = (date: Moment) => {
		dispatch(articleActions.saveValidTo(date));
	};

	const handleCategoriesChanged = (categories: CategoryDto[]) => {
		dispatch(articleActions.saveCategories(categories));
	};

	const onHtmlContentChange = (htmlContent?: string) => {
		dispatch(articleActions.saveContent(htmlContent));
	};

	const [errors, setErrors] = useState<Record<string, boolean | string>>({});

	const validateForm = () => {
		setErrors({ ...errors, ['title']: title.length > 0 });
		setErrors({ ...errors, ['categories']: selectedCategories.length > 0 });
		setErrors({ ...errors, ['content']: htmlContent.length > 0 });
	};

	const requestPostArticle = () => {
		dispatch(articleActions.uploadArticle(article));
		navigate('/admin');
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		validateForm();

		if (Object.values(errors).some((x) => x === false)) {
			setErrors({
				...errors,
				form: 'Please fill every fields.',
			});
			return;
		}

		requestPostArticle();
	};

	return (
		<EuiForm
			component='form'
			onSubmit={handleSubmit}
			isInvalid={Boolean(errors.form)}
			error={[errors.form]}
		>
			<EuiFlexGroup justifyContent='center'>
				<EuiFlexItem style={{ alignItems: 'center' }}>
					<EuiText>
						<h3>New Article</h3>
					</EuiText>
				</EuiFlexItem>
			</EuiFlexGroup>
			<EuiSpacer />
			<EuiFlexGroup justifyContent='center'>
				<EuiFlexItem grow={false} style={{ alignItems: 'center' }}>
					<EuiPanel>
						<EuiFormRow fullWidth>
							<EuiFieldText
								placeholder='Title'
								fullWidth
								value={title}
								onChange={onTitleChange}
								isInvalid={Boolean(errors.title)}
							/>
						</EuiFormRow>
						<EuiSpacer size='s' />
						<EuiFormRow fullWidth isInvalid={Boolean(errors.content)}>
							<ArticleEditor onChange={onHtmlContentChange} />
						</EuiFormRow>
					</EuiPanel>
				</EuiFlexItem>
				<EuiFlexItem
					grow={false}
					style={{ alignItems: 'center', minWidth: 400, maxWidth: 400 }}
				>
					<EuiPanel style={{ width: '90%' }}>
						<EuiFormRow
							label='Categories'
							helpText='Select categories.'
							isInvalid={Boolean(errors.categories)}
						>
							<MultiSelect
								items={categories.map((x) => ({
									category: x,
									checked: selectedCategories.some((c) => c.id === x.id)
										? 'on'
										: undefined,
								}))}
								onChange={handleCategoriesChanged}
							/>
						</EuiFormRow>
						<EuiFormRow label='Valid to' helpText='Select expiration date.'>
							<EuiDatePicker
								showTimeSelect
								value={validToDate?.toString()}
								onChange={onChange}
								placeholder='Expiration date'
							/>
						</EuiFormRow>
						<EuiFormRow label='Display'>
							<EuiSwitch
								label='Show on home page'
								checked={checked}
								onChange={onCheckChange}
							/>
						</EuiFormRow>
						<EuiSpacer />
						<EuiButton type='submit' iconSide='right' fill>
							Create
						</EuiButton>
					</EuiPanel>
				</EuiFlexItem>
			</EuiFlexGroup>
		</EuiForm>
	);
};

export default ArticleForm;
