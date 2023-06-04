import { motion } from 'framer-motion';

const TheEcoSystem = () => {
  return (
    <div
      style={{
        height: 'fit-content',
        width: '100%',
        paddingTop: '5rem',
        background:
          'linear-gradient(175.37deg, rgba(250, 255, 239, 0.06) 3.42%, rgba(250, 255, 239, 0.06) 3.43%, rgba(236, 254, 255, 0.06) 94.15%), #FBFDFF',
      }}
      id="ecosystem"
    >
      <div
        style={{
          display: 'flex',
          position: 'relative',
          left: '15rem',
          top: '17rem',
          zIndex: 10,
          width: 'fit-content',
        }}
      >
        <div
          style={{ backgroundColor: '#FFFFFF', margin: 'auto 0', width: '7.2rem' }}
          className="w-44 border-2 h-0"
        />

        <p
          style={{
            fontSize: '3.6rem',
            fontWeight: '700',
            color: '#FFFFFF',
            marginLeft: '1rem',
          }}
        >
          THE ECOSYSTEM SYSTEM
        </p>
      </div>

      <motion.img
        src="assets/images/ecosystem.png"
        alt="eco-system"
        style={{
          margin: 'auto',
          padding: '10rem 0rem',
        }}
        animate={{ y: [-20, 0, -20] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </div>
  );
};

export default TheEcoSystem;
