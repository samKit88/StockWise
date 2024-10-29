import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routers/routers'
// import { AuthContextProvider } from './context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store, { persistor } from './services/store/store'
import { MantineProvider } from '@mantine/core'
const queryClient = new QueryClient()
import '@mantine/notifications/styles.css'
import '@mantine/core/styles.css'
import './index.css'
// import '@mantine/dropzone/styles.css'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Notifications } from '@mantine/notifications'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider defaultColorScheme="light" forceColorScheme="light">
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Notifications position="top-right" />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </PersistGate>
        <Notifications position="top-right" />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
)
