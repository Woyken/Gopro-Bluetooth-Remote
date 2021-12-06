import { configureStore } from '@reduxjs/toolkit';

import { goproBluetoothReducer } from './goproBluetoothSlice';
import { goproSettingsReducer } from './goproSettingsSlice';

export const store = configureStore({
    reducer: {
        goproBluetoothReducer,
        goproSettingsReducer,
    },
    devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
