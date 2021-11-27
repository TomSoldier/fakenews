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
import { LoginPage } from './pages/Home/LoginPage';
import { RegistrationPage } from './pages/Home/RegistrationPage';
import RequireAuth from './pages/Auth/RequireAuth';
import WithoutLoginOnly from './pages/Auth/WithoutLoginOnly';
import ProfilePage from './pages/User/ProfilePage';
import DashboardPage from './pages/Admin/DashboardPage';
import RequireAdminRole from './pages/Auth/RequireAdminRole';
import Forbidden from './pages/Home/Forbidden';
import CategoriesPage from './pages/Admin/CategoriesPage';
import Admin from './pages/Admin/Admin';
import NotFound from './pages/Home/NotFound';
import UsersPage from './pages/Admin/UsersPage';
import ArticlesPage from './pages/Admin/ArticlesPage';

registerTheme('light', [themeLight]);
registerTheme('dark', [themeDark]);

const persistor = persistStore(store);

const adminRoutes = (
	<Route
		path='admin'
		element={
			<RequireAuth>
				<RequireAdminRole>
					<Admin />
				</RequireAdminRole>
			</RequireAuth>
		}
	>
		<Route index element={<DashboardPage />} />
		<Route path='users' element={<UsersPage />} />
		<Route path='articles' element={<ArticlesPage />} />
		<Route path='categories' element={<CategoriesPage />} />
	</Route>
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Layout />}>
								<Route index element={<Home />} />
								<Route path='forbidden' element={<Forbidden />} />
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
								{adminRoutes}
								<Route path='*' element={<NotFound />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
