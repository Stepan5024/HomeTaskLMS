import { createApi } from '@reduxjs/toolkit/query/react';
import { interceptedBaseQuery } from './interceptedBaseQuery';

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: interceptedBaseQuery,
    endpoints: (builder) => ({
        askQuestion: builder.mutation<{ answer: string }, { question: string }>(
            {
                query: (body) => ({
                    url: '/v1/question',
                    method: 'POST',
                    body: body,
                }),
            }
        ),
    }),
});

export const { useAskQuestionMutation } = chatApi;
