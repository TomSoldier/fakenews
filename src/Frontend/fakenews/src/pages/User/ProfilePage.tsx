import {
	EuiFlexGrid,
	EuiFlexGroup,
	EuiFlexItem,
	EuiImage,
	EuiPanel,
	EuiSpacer,
	EuiTabbedContent,
	EuiText,
	EuiTitle,
} from '@elastic/eui';
import React, { Fragment } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { userSelectors } from '../../redux/selectors/userSelectors';

const tabs = [
	{
		id: 'tab1',
		name: 'Tab1',
		content: (
			<Fragment>
				<EuiSpacer />
				<EuiTitle>
					<h3>Content</h3>
				</EuiTitle>
				<EuiText>Lorem ipsum.</EuiText>
			</Fragment>
		),
	},
	{
		id: 'tab2',
		name: 'Tab2',
		content: (
			<Fragment>
				<EuiSpacer />
				<EuiTitle>
					<h3>Content</h3>
				</EuiTitle>
				<EuiText>Lorem ipsum.</EuiText>
			</Fragment>
		),
	},
];

const Profile = () => {
	const user = useAppSelector(userSelectors.userDetails);
	return (
		<EuiFlexGroup className='eui-fullWidth' justifyContent='center'>
			<EuiSpacer size='m' />
			<EuiFlexItem>
				<EuiFlexGrid columns={2} direction='row'>
					<EuiFlexItem className='eui-textCenter' style={{ maxWidth: 400 }}>
						<EuiImage
							size='s'
							alt='Random nature image'
							src='https://picsum.photos/300/300'
							style={{ borderRadius: '50%' }}
						/>

						<EuiText>
							<div>
								<h1>{user?.name ?? 'Name'}</h1>
								<dl>
									<dt>{user?.role ?? 'Role'}</dt>
								</dl>
							</div>
						</EuiText>
					</EuiFlexItem>
					<EuiFlexItem>
						<EuiPanel>
							<EuiFlexGroup>
								<EuiFlexItem className='eui-fullWidth'>
									<EuiText>content</EuiText>
								</EuiFlexItem>
								<EuiFlexItem className='eui-fullWidth'>
									<EuiText>content</EuiText>
								</EuiFlexItem>
							</EuiFlexGroup>
						</EuiPanel>
					</EuiFlexItem>
				</EuiFlexGrid>
				<EuiSpacer size='m' />
				<EuiPanel>
					<EuiFlexItem>
						<EuiTabbedContent
							tabs={tabs}
							initialSelectedTab={tabs[1]}
							autoFocus='selected'
						/>
					</EuiFlexItem>
				</EuiPanel>
			</EuiFlexItem>
		</EuiFlexGroup>
	);
};

export default Profile;
