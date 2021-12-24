import '../styles/app.scss';
import 'sweetalert2/src/sweetalert2.scss';
import { GlobalStoreProvider } from '@/hooks/useGlobalStore';

function MyApp({ Component, pageProps }) {
  return (
    <div id='app'>
      <GlobalStoreProvider>
        <Component {...pageProps} />
      </GlobalStoreProvider>
    </div>
  );
}

export default MyApp;
