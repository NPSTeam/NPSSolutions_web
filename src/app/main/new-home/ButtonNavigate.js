import { IconButton } from '@mui/material';

export default function ButtonNavigate({ currentSection }) {
  return (
    <IconButton
      sx={{
        position: 'fixed',
        bottom: '3%',
        right: '0%',
        transform: 'translate(-50%, -50%)',
      }}
      onClick={() => {
        console.log('currentSection', currentSection);
      }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M39.9998 75.8346C20.2332 75.8346 4.1665 59.768 4.1665 40.0013C4.1665 20.2346 20.2332 4.16797 39.9998 4.16797C59.7665 4.16797 75.8332 20.2346 75.8332 40.0013C75.8332 59.768 59.7665 75.8346 39.9998 75.8346ZM39.9998 9.16797C22.9998 9.16797 9.1665 23.0013 9.1665 40.0013C9.1665 57.0013 22.9998 70.8346 39.9998 70.8346C56.9998 70.8346 70.8332 57.0013 70.8332 40.0013C70.8332 23.0013 56.9998 9.16797 39.9998 9.16797Z"
          fill="#CED4DA"
        />
        <path
          d="M40 50.0318C39.3667 50.0318 38.7334 49.7984 38.2334 49.2984L26.4667 37.5318C25.5 36.5651 25.5 34.9651 26.4667 33.9984C27.4334 33.0318 29.0334 33.0318 30 33.9984L40 43.9984L50 33.9984C50.9667 33.0318 52.5667 33.0318 53.5334 33.9984C54.5 34.9651 54.5 36.5651 53.5334 37.5318L41.7667 49.2984C41.2667 49.7984 40.6334 50.0318 40 50.0318Z"
          fill="#CED4DA"
        />
      </svg>
    </IconButton>
  );
}
