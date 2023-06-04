const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        height: '14.7rem',
        position: 'relative',
      }}
      className="flex justify-between mx-auto px-92 py-36"
    >
      <div
        style={{
          margin: 'auto 0',
        }}
      >
        <p>
          <span
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#4B5768',
              fontFamily: 'Poppins, "Helvetica", "Arial", sans-serif',
            }}
          >
            © 2023, All Copyright by{' '}
            <span
              style={{
                color: '#006AFF',
              }}
            >
              NPSSolutions
            </span>
          </span>
        </p>
      </div>

      <div
        style={{
          margin: 'auto 0',
        }}
      >
        <div className="flex flex-row justify-center items-center my-auto space-x-10 text-white">
          <div
            className="px-20"
            style={{
              fontSize: '1.8rem',
              fontWeight: '500',
              fontFamily: 'Poppins, "Helvetica", "Arial", sans-serif',
              color: '#4B5768',
            }}
          >
            Feature
          </div>

          <div
            className="px-20"
            style={{
              fontSize: '1.8rem',
              fontWeight: '500',
              fontFamily: 'Poppins, "Helvetica", "Arial", sans-serif',
              color: '#4B5768',
            }}
          >
            Product
          </div>

          <div
            className="px-20"
            style={{
              fontSize: '1.8rem',
              fontWeight: '500',
              fontFamily: 'Poppins, "Helvetica", "Arial", sans-serif',
              color: '#4B5768',
            }}
          >
            Contact
          </div>

          <div
            className="px-20"
            style={{
              fontSize: '1.8rem',
              fontWeight: '500',
              fontFamily: 'Poppins, "Helvetica", "Arial", sans-serif',
              color: '#4B5768',
            }}
          >
            Terms of Use
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
