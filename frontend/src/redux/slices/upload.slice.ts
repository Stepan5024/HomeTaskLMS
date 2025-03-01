import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface VideoState {
    file: {
        loading: boolean;
        error: string | null;
        success: boolean;
        progress: number;
    };
    result: {
        code: number | null;
        MD_FILE: string | null;
        result: string | null;
        transcription: string | null;
    };
}

const initialState: VideoState = {
    file: {
        loading: false,
        error: null,
        success: false,
        progress: 0,
    },
    result: {
        code: null,
        MD_FILE: null,
        result: null,
        transcription: null,
    },
};

export const uploadVideo = createAsyncThunk<
    { code: number; MD_FILE: string; result: string; transcription: string },
    { file: File },
    { rejectValue: string; state: RootState }
>('video/upload', async ({ file }, { dispatch, rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post<{
            code: number;
            MD_FILE: string;
            result: string;
            transcription: string;
        }>('/api/v1/homework/upload_file', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
                const percent = Math.round(
                    (progressEvent.loaded * 100) / (progressEvent.total || 1)
                );
                dispatch(setProgress(percent));
            },
        });

        dispatch(setProgress(100));

        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const uploadSlice = createSlice({
    name: 'uploadSlice',
    initialState,
    reducers: {
        resetUpload: (state) => {
            state.file.loading = false;
            state.file.error = null;
            state.file.success = false;
        },
        setProgress: (state, action: PayloadAction<number>) => {
            state.file.progress = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadVideo.pending, (state) => {
                state.file.loading = true;
                state.file.error = null;
                state.file.success = false;
                state.file.progress = 0;
            })
            .addCase(
                uploadVideo.fulfilled,
                (
                    state,
                    action: PayloadAction<{
                        code: number;
                        MD_FILE: string;
                        result: string;
                        transcription: string;
                    }>
                ) => {
                    state.file.loading = false;
                    state.file.success = true;
                    state.result.MD_FILE = action.payload.MD_FILE;
                    state.result.result = action.payload.result;
                    state.result.code = action.payload.code;
                    state.result.transcription = action.payload.transcription;
                }
            )
            .addCase(
                uploadVideo.rejected,
                (state, action: PayloadAction<any>) => {
                    state.file.loading = false;
                    state.file.error = action.payload || 'Ошибка загрузки';
                }
            );
    },
});

export const { setProgress, resetUpload } = uploadSlice.actions;
