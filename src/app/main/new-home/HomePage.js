import withReducer from 'app/store/withReducer';
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import reducer from './store';
import Banner from './Banner';

import Footer from './Footer';
import TheEcoSystem from './TheEcoSystem';
import Feature from './Feature';
import OurProducts from './OurProducts';
import ContactUs from './ContactUs';
import Header from './Header';
import Section from './Section';

function HomePage() {
  const [currentSection, setCurrentSection] = useState('');

  const bannerRef = useRef(null);
  const industryRef = useRef(null);
  const ecoSystemRef = useRef(null);
  const ourProductsRef = useRef(null);
  const contactRef = useRef(null);

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // Adjust this threshold as needed
  };

  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setCurrentSection(entry.target.id);
      }
    });
  };

  useEffect(() => {
    const bannerObserver = new IntersectionObserver(handleIntersect, observerOptions);
    const industryObserver = new IntersectionObserver(handleIntersect, observerOptions);
    const ecoSystemObserver = new IntersectionObserver(handleIntersect, observerOptions);
    const ourProductsObserver = new IntersectionObserver(handleIntersect, observerOptions);
    const contactObserver = new IntersectionObserver(handleIntersect, observerOptions);

    if (bannerRef.current) {
      bannerObserver.observe(bannerRef.current);
    }
    if (industryRef.current) {
      industryObserver.observe(industryRef.current);
    }
    if (ecoSystemRef.current) {
      ecoSystemObserver.observe(ecoSystemRef.current);
    }
    if (ourProductsRef.current) {
      ourProductsObserver.observe(ourProductsRef.current);
    }
    if (contactRef.current) {
      contactObserver.observe(contactRef.current);
    }

    return () => {
      bannerObserver.disconnect();
      industryObserver.disconnect();
      ecoSystemObserver.disconnect();
      ourProductsObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Header />

      <div
        style={{
          overflowY: 'overlay',
          // top: '8rem ',
          position: 'relative',
        }}
      >
        <div ref={bannerRef} id="banner1" className="h-full">
          <Banner />
        </div>
        <Section>
          <div ref={industryRef} id="industry1">
            <Feature />
          </div>
        </Section>
        <Section>
          <div ref={ecoSystemRef} id="ecoSystem1">
            <TheEcoSystem />
          </div>
        </Section>
        <Section>
          <div ref={ourProductsRef} id="ourProducts1">
            <OurProducts />
          </div>
        </Section>

        <div ref={contactRef} id="contact1">
          <ContactUs />
        </div>

        <Footer />
        {/* <ButtonNavigate currentSection={currentSection} /> */}
      </div>
    </Box>
  );
}

export default withReducer('homePageNew', reducer)(HomePage);
