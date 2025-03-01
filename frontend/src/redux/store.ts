import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { uploadSlice } from './slices/upload.slice';
import { chatApi } from './api/chat.api';

export const store = configureStore({
    reducer: {
        [chatApi.reducerPath]: chatApi.reducer,
        uploadSlice: uploadSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(chatApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
