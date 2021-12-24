import { useRouter } from 'next/router';
//
export default function useAuth(Component) {
  return (props) => {
    if (typeof window !== 'undefined') {
      const Router = useRouter();
      const accessToken = localStorage.getItem('user-data');

      if (!accessToken) {
        localStorage.setItem('be-authorized', window.location.pathname);
        Router.replace('/login');
        return null;
      }
    }
    return <Component {...props} />;
  };
}
