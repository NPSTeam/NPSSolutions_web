import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const fadeInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function Section({ children }) {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const sectionRef = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );
    observer.observe(sectionRef);
    return () => {
      observer.unobserve(sectionRef);
    };
  }, [controls]);

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={fadeInVariants}>
      {children}
    </motion.div>
  );
}
