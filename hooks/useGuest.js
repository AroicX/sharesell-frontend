import { useRouter } from 'next/router';
//
export default function useGuest(Component) {
  return (props) => {
    if (typeof window !== 'undefined') {
      const Router = useRouter();
      const accessToken = localStorage.getItem('user-data');

      if (accessToken) {
        Router.back();
      }
    }
    return <Component {...props} />;
  };
}
