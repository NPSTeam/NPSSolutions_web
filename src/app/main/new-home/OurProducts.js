import ProductSkyeye from './component/ProductSkyeye';
import SkyeyeStudio from './component/SkyeyeStudio';

const OurProducts = () => {
  return (
    <div
      style={{
        height: 'fit-content',
        width: '100%',
        paddingTop: '5rem',
        background:
          'linear-gradient(175.37deg, rgba(250, 255, 239, 0.06) 3.42%, rgba(250, 255, 239, 0.06) 3.43%, rgba(236, 254, 255, 0.06) 94.15%), #FBFDFF',
      }}
      id="product"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            position: 'relative',
            top: '5rem',
            left: '15rem',
            width: 'fit-content',
          }}
        >
          <div
            style={{ backgroundColor: '#0D3659', margin: 'auto 0', width: '7.2rem' }}
            className="w-44 border-2 h-0"
          />

          <p
            style={{
              fontSize: '3.6rem',
              fontWeight: '700',
              color: '#0D3659',
              marginLeft: '1rem',
            }}
          >
            OUR PRODUCTS
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            position: 'relative',
            top: '5rem',
            left: '15rem',
            paddingTop: '1rem',
            width: 'fit-content',
          }}
        >
          <p
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#0D3659',
            }}
          >
            WHAT WE’VE MADE
          </p>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5rem',
          padding: '10rem 23rem 5rem 23rem',
        }}
      >
        <ProductSkyeye />
        <SkyeyeStudio />
      </div>
    </div>
  );
};

export default OurProducts;
