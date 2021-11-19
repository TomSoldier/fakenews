import {
	EuiFlexGroup,
	EuiFlexItem,
	EuiPanel,
	EuiSpacer,
	EuiPage,
	EuiPageBody,
	EuiPageContent,
	EuiPageContentBody,
	EuiButton,
} from '@elastic/eui';
import * as React from 'react';
import Header from './components/Header/Header';
const App = () => {
	return (
		<EuiPage paddingSize='none' className='eui-fullHeight'>
			<EuiPageBody className='eui-fullHeight'>
				<Header />
				<EuiPageContent
					color='transparent'
					borderRadius='none'
					hasShadow={false}
					paddingSize='m'
					className='eui-fullHeight'
				>
					<EuiPageContentBody paddingSize='l' className='eui-fullHeight'>
						<EuiFlexGroup
							className='eui-fullHeight'
							gutterSize='none'
							direction='column'
							responsive={false}
						>
							<EuiFlexItem grow={false}>
								<EuiPanel color='danger' />
							</EuiFlexItem>
							<EuiSpacer size='l' />
							<EuiFlexItem className='eui-fullHeight'>
								<EuiFlexGroup className='eui-fullHeight' gutterSize='l'>
									<EuiFlexItem grow={2}>
										<EuiPanel
											tabIndex={0}
											className='eui-yScroll'
											hasShadow={false}
										>
											content
										</EuiPanel>
									</EuiFlexItem>
									<EuiFlexItem>
										<EuiPanel hasShadow={false} />
										<EuiSpacer />
										<EuiButton>Button</EuiButton>
									</EuiFlexItem>
								</EuiFlexGroup>
							</EuiFlexItem>
						</EuiFlexGroup>
					</EuiPageContentBody>
				</EuiPageContent>
			</EuiPageBody>
		</EuiPage>
	);
};
export default App;
