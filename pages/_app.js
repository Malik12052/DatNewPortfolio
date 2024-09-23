import '../styles/globals.css';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor'; // Import the CustomCursor component
import Header from '../components/Header.js';
function MyApp({ Component, pageProps }) {
  return (
    <>
          <Header />

      <CustomCursor /> {/* Add the CustomCursor component here */}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
