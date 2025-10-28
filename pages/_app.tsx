import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

//  Types
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'

//  Styles
import '../styles/globals.css'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/notifications/styles.css'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { EdgeStoreProvider } from '@/lib/frontend/edgestore'

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (_page: ReactElement<any>) => ReactNode
}

type AppPropsWithLayout<
  P = { dehydratedState: DehydratedState; }
> = AppProps<P> & {
  Component: NextPageWithLayout<P>
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 'Infinity' as unknown as number,
        refetchOnMount: false,
        refetchOnWindowFocus: true,
        retry: false,
      },
    },
  })

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <EdgeStoreProvider>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <Notifications position="top-center" />
            {getLayout(<Component {...pageProps} />)}
          </HydrationBoundary>
        </EdgeStoreProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App
