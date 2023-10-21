import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import authReducer from './slices/auth-slice';
// import clientReducer from './slices/clientSlice';

const rootReducer = combineReducers({
	authSlice: authReducer,
	// clientSlice: clientReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
});

type RootState = ReturnType<typeof store.getState>;

export const dispatch = (action: Action) => store.dispatch(action);
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
