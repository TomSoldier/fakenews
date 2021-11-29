import {
	EuiBadge,
	EuiFlexGroup,
	EuiFlexItem,
	EuiHorizontalRule,
	EuiLink,
	EuiPageTemplate,
	EuiPanel,
	EuiShowFor,
	EuiSpacer,
	EuiText,
} from '@elastic/eui';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router';
import SearchForm from '../../components/Forms/SearchForm';
import { useAppSelector } from '../../redux/hooks';
import { articleSelectors } from '../../redux/selectors/articleSelectors';

const SearchPage = () => {
	const navigate = useNavigate();
	const searchResult = useAppSelector(articleSelectors.searchResults);

	return (
		<EuiPageTemplate template='empty' restrictWidth>
			<EuiFlexGroup
				className='eui-fullHeight'
				gutterSize='none'
				direction='column'
				responsive={false}
			>
				<EuiSpacer size='l' />
				<EuiFlexItem className='eui-fullHeight' grow={false}>
					<EuiFlexGroup className='eui-fullHeight' gutterSize='l'>
						<EuiFlexItem grow={2}>
							<EuiPanel className='eui-yScroll' hasShadow={false}>
								{searchResult && (
									<EuiFlexGroup direction='column'>
										<EuiFlexItem>
											<EuiText>
												<h2>{`${searchResult.length} results`}</h2>
											</EuiText>
											<EuiHorizontalRule />
										</EuiFlexItem>
										{searchResult.length === 0 && (
											<EuiFlexItem>
												<span>No results.</span>
											</EuiFlexItem>
										)}
										{searchResult.map((x) => (
											<EuiFlexItem key={x.id}>
												<EuiPanel>
													<EuiFlexGroup direction='column'>
														<EuiFlexItem>
															<EuiText>
																<h2>
																	<EuiLink
																		onClick={() =>
																			navigate(`/articles/${x.id}`)
																		}
																	>
																		{x.title}
																	</EuiLink>
																</h2>
															</EuiText>
														</EuiFlexItem>
														<EuiFlexItem grow={false}>
															<div>
																{x.categories.map((x) => (
																	<EuiBadge
																		key={x.name}
																		color={x.colorCode}
																		style={{
																			minWidth: 75,
																			textAlign: 'center',
																		}}
																	>
																		{x.name}
																	</EuiBadge>
																))}
															</div>
														</EuiFlexItem>
														<EuiFlexItem grow={false}>
															<div>
																{moment(x.createdDate).format('YYYY-MM-DD')}
															</div>
														</EuiFlexItem>
													</EuiFlexGroup>
												</EuiPanel>
											</EuiFlexItem>
										))}
									</EuiFlexGroup>
								)}
							</EuiPanel>
						</EuiFlexItem>
						<EuiShowFor sizes={['l', 'xl']}>
							<EuiFlexItem>
								<div style={{ position: 'fixed', textAlign: 'center' }}>
									<EuiText>
										<h2>Detailed search</h2>
									</EuiText>
									<SearchForm />
								</div>
							</EuiFlexItem>
						</EuiShowFor>
					</EuiFlexGroup>
				</EuiFlexItem>
			</EuiFlexGroup>
		</EuiPageTemplate>
	);
};

export default SearchPage;
