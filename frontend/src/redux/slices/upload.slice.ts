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
}

const initialState: VideoState = {
    file: {
        loading: false,
        error: null,
        success: false,
        progress: 0,
    },
};

export const uploadVideo = createAsyncThunk<
    void,
    { file: File; lessonId: string; courseId: string }, // Обновили тут
    { rejectValue: string; state: RootState }
>(
    'video/upload',
    async ({ file, lessonId, courseId }, { dispatch, rejectWithValue }) => {
        const formData = new FormData();
        formData.append('video', file);
        formData.append('lessonId', lessonId);
        formData.append('courseId', courseId);

        try {
            await axios.post('/api/v1/homework/upload_file', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) /
                            (progressEvent.total || 1)
                    );
                    dispatch(setProgress(percent));
                },
            });

            dispatch(setProgress(100));
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

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
            .addCase(uploadVideo.fulfilled, (state) => {
                state.file.loading = false;
                state.file.success = true;
            })
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
