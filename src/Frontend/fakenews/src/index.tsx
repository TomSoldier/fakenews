import * as React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';

import themeLight from '@elastic/eui/src/theme_light.scss';
import themeDark from '@elastic/eui/src/theme_dark.scss';
import { registerTheme } from './services/theme/theme';
import { ThemeProvider } from './services/theme/context/ThemeContext';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Second from './pages/Home/Second';
import { LoginPage } from './pages/Home/LoginPage';
import { RegistrationPage } from './pages/Home/RegistrationPage';
import RequireAuth from './pages/Auth/RequireAuth';
import ProfilePage from './pages/Home/ProfilePage';
import WithoutLoginOnly from './pages/Auth/WithoutLoginOnly';

registerTheme('light', [themeLight]);
registerTheme('dark', [themeDark]);

const persistor = persistStore(store);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Layout />}>
								<Route index element={<Home />} />
								<Route
									path='login'
									element={
										<WithoutLoginOnly>
											<LoginPage />
										</WithoutLoginOnly>
									}
								/>
								<Route
									path='registration'
									element={
										<WithoutLoginOnly>
											<RegistrationPage />
										</WithoutLoginOnly>
									}
								/>
								<Route
									path='profile'
									element={
										<RequireAuth>
											<ProfilePage />
										</RequireAuth>
									}
								/>
								<Route
									path='/protected'
									element={
										<RequireAuth>
											<Second />
										</RequireAuth>
									}
								/>
							</Route>
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
