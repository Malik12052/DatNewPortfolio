import '../styles/globals.css';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header.js';
import Head from 'next/head'; // Import Head from next/head

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Import Poppins font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <CustomCursor />
      <div style={{ fontFamily: 'Poppins, sans-serif' }}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
