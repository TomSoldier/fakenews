import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import themeLight from '@elastic/eui/src/theme_light.scss';
import themeDark from '@elastic/eui/src/theme_dark.scss';
import { registerTheme } from './services/theme/theme';
import { ThemeProvider } from './services/context/ThemeContext';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './redux/store';

registerTheme('light', [themeLight]);
registerTheme('dark', [themeDark]);

const persistor = persistStore(store);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
