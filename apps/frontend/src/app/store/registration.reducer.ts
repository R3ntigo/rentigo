import { createSlice } from '@reduxjs/toolkit';
import { Registration } from '@rentigo/models';

export const registrationSlice = createSlice({
	name: 'registration',
	initialState: {} as Registration,
	reducers: {
		setRegistration(state, action) {
			return action.payload;
		},
	},
});

export const { setRegistration } = registrationSlice.actions;
