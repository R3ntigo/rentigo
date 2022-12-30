import { createSlice } from '@reduxjs/toolkit';

export const registrationSlice = createSlice({
	name: 'registration',
	initialState: null,
	reducers: {
		setRegistration(state, action) {
			return action.payload;
		},
	},
});

export const { setRegistration } = registrationSlice.actions;
