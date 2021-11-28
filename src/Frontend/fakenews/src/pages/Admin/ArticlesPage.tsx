import { EuiPanel } from '@elastic/eui';
import React from 'react';
import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import ArticleEditor from '../../components/Editor/ArticleEditor';
import MultiSelect from '../../components/Select/MultiSelect';
import { useAppSelector } from '../../redux/hooks';
import { categorySelectors } from '../../redux/selectors/categorySelectors';

const ArticlesPage = () => {
	const categories = useAppSelector(categorySelectors.categories);

	return (
		<EuiFlexGroup justifyContent='center'>
			<EuiFlexItem style={{ alignItems: 'center' }}>
				<EuiPanel style={{ width: '90%' }}>
					<ArticleEditor />
				</EuiPanel>
			</EuiFlexItem>
			<EuiFlexItem style={{ alignItems: 'center' }}>
				<EuiPanel style={{ width: '90%' }}>
					<MultiSelect
						items={categories.map((x) => ({
							name: x.name,
							colorCode: x.colorCode,
						}))}
					/>
				</EuiPanel>
			</EuiFlexItem>
		</EuiFlexGroup>
	);
};

export default ArticlesPage;
