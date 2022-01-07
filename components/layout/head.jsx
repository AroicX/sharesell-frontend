import NextHead from 'next/head';

const siteDescription = 'ShareSell Africa  ';

const Head = ({ title }) => {
  const newTitle = title ? `${title} | ` : '';
  return (
    <NextHead>
      <title>{newTitle} - ShareSell Africa</title>
      <meta
        name='keywords'
        content='airbnb, house, listing, property, buy houses, rent, duplex, apartment'
      />
      <meta name='description' content={siteDescription} />
      <meta property='og:title' content='ShareSell Africa' />
      <meta property='og:type' content='website' />
      {/* <meta property="og:url" content={process.env.BASE_URL} /> */}
      <meta property='og:description' content={siteDescription} />
      {/* <meta property="og:image" content="https://printivo.s3.amazonaws.com/img/image-seo-share-large.png" /> */}
      /favicon/logo.ico
      <link rel='shortcut icon' href='/svg/logo.svg' type='image/x-icon' />
      <meta property='twitter:card' content='summary_large_image' />
      <script
        src='https://widget.cloudinary.com/v2.0/global/all.js'
        type='text/javascript'
      ></script>
    </NextHead>
  );
};

export default Head;
