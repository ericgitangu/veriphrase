'use client'
import React from 'react';
import Layout from './layout';
import ConfirmationCode from './components/ConfirmationCode';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <main className="flex flex-col items-center justify-center min-h-screen py-2">
          <ConfirmationCode />
        </main>
      </div>
    </Layout>
  );
};

export default Home;
