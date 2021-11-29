import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import eventReducer from './slices/eventSlice';
import categoryReducer from './slices/categorySlice';
import articleReducer from './slices/articleSlice';
import {
	configureStore,
	combineReducers,
	ThunkAction,
	Action,
} from '@reduxjs/toolkit';

const reducers = combineReducers({
	theme: themeReducer,
	user: userReducer,
	event: eventReducer,
	category: categoryReducer,
	article: articleReducer,
});

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
