import { configureStore } from '@reduxjs/toolkit';
import { registrationSlice } from './registration.reducer';

export const store = configureStore({
	reducer: {
		registration: registrationSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
