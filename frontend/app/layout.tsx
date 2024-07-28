import React from 'react';
import Head from 'next/head';
import './globals.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head>
        <title>VeriPhrase - Confirmation Code Encoder</title>
        <meta name="description" content="VeriPhrase - Encode your confirmation codes into human-readable words" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="VeriPhrase - Confirmation Code Encoder" />
        <meta property="og:description" content="Encode your confirmation codes into human-readable words with VeriPhrase." />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="http://localhost:3000" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
