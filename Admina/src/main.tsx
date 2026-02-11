
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './slices';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import ErrorBoundary from './components/ErrorBoundary';
import SomethingWentWrong from './components/SomethingWentWrong';
import { NotificationProvider } from './shared/Utils/NotificationContext/NotificationContext';

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

const persistor = persistStore(store);

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container missing in index.html');
}

const root = ReactDOM.createRoot(container);

root.render(
  <ErrorBoundary
    fallback={({ error, reset }: any) => (
      <SomethingWentWrong error={error} reset={reset} />
    )}
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
