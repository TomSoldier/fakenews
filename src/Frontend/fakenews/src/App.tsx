import {
	EuiPageTemplate,
	EuiFlexGroup,
	EuiFlexItem,
	EuiPanel,
	EuiSpacer,
	EuiSwitch,
	EuiSwitchEvent,
} from '@elastic/eui';
import * as React from 'react';
import { themeActions } from './redux/actions/themeActions';
import { useAppDispatch } from './redux/hooks';
import { ThemeProvider } from './services/context/ThemeContext';
const App = () => {
	const [darkMode, setDarkMode] = React.useState(false);
	const dispatch = useAppDispatch();

	const onChange = (e: EuiSwitchEvent) => {
		dispatch(themeActions.toggleMode(e.target.checked ? 'dark' : 'light'));
		setDarkMode(e.target.checked);
	};

	return (
		<ThemeProvider>
			<EuiPageTemplate fullHeight template='empty'>
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
								<EuiSwitch
									label='dark mode'
									checked={darkMode}
									onChange={onChange}
								/>
							</EuiFlexItem>
						</EuiFlexGroup>
					</EuiFlexItem>
				</EuiFlexGroup>
			</EuiPageTemplate>
		</ThemeProvider>
	);
};
export default App;
