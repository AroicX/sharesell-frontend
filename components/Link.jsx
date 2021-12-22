import NextLink from 'next/link';
import { useRouter } from 'next/router';

const Link = ({ to, children, as, ...rest }) => {
  const { pathname } = useRouter();
  const className = pathname === to || pathname === as ? 'active' : '';
  return (
    <NextLink href={to}>
      <a className={className} {...rest}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
