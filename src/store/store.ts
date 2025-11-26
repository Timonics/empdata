// store/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./slices/admin_auth.slice";
// import companyAuthReducer from "./slices/company_auth.slice";
// import employeeAuthReducer from "./slices/employee_auth.slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Persist configs for different slices
const adminAuthPersistConfig = {
  key: "adminAuth",
  storage,
  blacklist: ["loading", "error"],
};

// const companyAuthPersistConfig = {
//   key: "companyAuth", 
//   storage,
//   blacklist: ["loading", "error"],
// };

// const employeeAuthPersistConfig = {
//   key: "employeeAuth",
//   storage,
//   blacklist: ["loading", "error"],
// };

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: [], // Handle persistence at slice level
};

const rootReducer = combineReducers({
  adminAuth: persistReducer(adminAuthPersistConfig, adminAuthReducer),
  // companyAuth: persistReducer(companyAuthPersistConfig, companyAuthReducer),
  // employeeAuth: persistReducer(employeeAuthPersistConfig, employeeAuthReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;