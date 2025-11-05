import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tableReducer from './tableSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['columns', 'theme'], // Only persist columns and theme
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, tableReducer);

export const store = configureStore({
  reducer: {
    table: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;