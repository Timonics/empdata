import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./slices/admin_auth.slice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["adminAuth"],
};

const rootReducer = {
  adminAuth: adminAuthReducer,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
