import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { uploadSlice } from './slices/upload.slice';

export const store = configureStore({
    reducer: {
        uploadSlice: uploadSlice.reducer,
    },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
