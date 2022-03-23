import '../styles/app.scss';
import 'sweetalert2/src/sweetalert2.scss';
import { GlobalStoreProvider } from '@/hooks/useGlobalStore';
import Router from 'next/router';
import NProgress from 'nprogress';
import Head from '@/components/layout/head';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', (url) => {
  NProgress.done();
  // ga.pageview(url);
});
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <div id='app'>
      <Head />
      <GlobalStoreProvider>
        <Component {...pageProps} />
      </GlobalStoreProvider>
    </div>
  );
}

export default MyApp;
