import {
	EuiGlobalToastList,
	EuiPage,
	EuiPageBody,
	EuiPageContent,
	EuiPageContentBody,
} from '@elastic/eui';
import * as React from 'react';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { mapEventsToToasts } from './services/events/fakeNewsEvent';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
import { eventActions } from './redux/actions/eventActions';
import { useEffect } from 'react';
import { categoryActions } from './redux/actions/categoryActions';
import { userSelectors } from './redux/selectors/userSelectors';
import httpClient from './services/http/http';

const Layout = () => {
	const dispatch = useAppDispatch();
	const events = useAppSelector((state) => state.event.events);
	const token = useAppSelector(userSelectors.jwtToken);

	const removeToast = (removedToast: Toast) => {
		dispatch(eventActions.removeEvent(removedToast.id));
	};

	useEffect(() => {
		dispatch(categoryActions.fetchCategories());
		if (token) {
			httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
		}
	}, [dispatch, token]);

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
						<Outlet />
						<EuiGlobalToastList
							toasts={mapEventsToToasts(events)}
							dismissToast={removeToast}
							toastLifeTimeMs={5000}
						/>
					</EuiPageContentBody>
				</EuiPageContent>
			</EuiPageBody>
		</EuiPage>
	);
};
export default Layout;
