// store/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./slices/admin_auth.slice";
import clientsAuthReducer from "./slices/clients_auth.slice";
import registrationsReducer from "./slices/onboarding.slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Persist configs for different slices
const adminAuthPersistConfig = {
  key: "adminAuth",
  storage,
  blacklist: ["loading", "error"],
};

const clientsAuthPersistConfig = {
  key: "clientsAuth",
  storage,
  blacklist: ["loading", "error"],
};

const registrationsPersistConfig = {
  key: "registrations",
  storage,
};

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  adminAuth: persistReducer(adminAuthPersistConfig, adminAuthReducer),
  clientsAuth: persistReducer(clientsAuthPersistConfig, clientsAuthReducer),
  registrations: persistReducer(registrationsPersistConfig, registrationsReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
