import { BuiltInProviderType } from '@auth/core/providers';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LiteralUnion } from 'next-auth/react';

interface AuthState {
	signin: {
		loading: boolean;
		email: string | null;
		id: LiteralUnion<BuiltInProviderType> | null;
	};
}

const initialState: AuthState = {
	signin: {
		loading: false,
		email: null,
		id: null,
	},
};

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setsigninloading: (state, action: PayloadAction<boolean>) => {
			state.signin.loading = action.payload;
		},
		setsignin: (state, action: PayloadAction<{ email: string; id: LiteralUnion<BuiltInProviderType>; loading?: boolean }>) => {
			state.signin = {
				...state.signin,
				...action.payload,
			};
		},
	},
});

export const { setsigninloading, setsignin } = slice.actions;

export default slice.reducer;
