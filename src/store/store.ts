import { configureStore } from '@reduxjs/toolkit';

import { goproBluetoothReducer } from './slices/goproBluetoothSlice';
import { goproSettingsMetadataReducer } from './slices/goproSettingsMetadataSlice';
import { goproSettingsReducer } from './slices/goproSettingsSlice';

export const store = configureStore({
    reducer: {
        goproBluetoothReducer,
        goproSettingsReducer,
        goproSettingsMetadataReducer,
    },
    devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
