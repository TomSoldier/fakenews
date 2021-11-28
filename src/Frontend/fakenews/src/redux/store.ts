import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import eventReducer from './slices/eventSlice';
import categoryReducer from './slices/categorySlice';
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
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
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
