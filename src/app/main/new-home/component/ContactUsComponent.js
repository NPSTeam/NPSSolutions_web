import { Box, Button, InputBase, Paper, Typography } from '@mui/material';

export default function ContactUsComponent() {
  return (
    <div
      className="contact-us"
      style={{
        height: 'fit-content',
        width: '100%',
        boxShadow: '4px 4px 30px rgba(0, 0, 0, 0.1)',
        borderRadius: '6px',
        background: '#FFFFFF',
        marginTop: '43rem',
        padding: '2.8rem 3.6rem 2.8rem 3.6rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div className="title-desc flex flex-col">
        <Typography
          sx={{
            fontSize: '3.2rem',
            fontWeight: '700',
            color: '#000000',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Contact Us
        </Typography>

        <Typography
          sx={{
            fontSize: '1.6rem',
            fontWeight: '400',
            color: '#000000',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Be the first one to know about offers and events
        </Typography>
      </div>

      <div className="form flex w-1/2 ">
        <Paper
          component="form"
          sx={{
            p: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '6rem',
            backgroundColor: '#DFDFDF',
          }}
        >
          <Box sx={{ p: '10px' }} aria-label="menu">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3333 13.6673H4.66659C2.66659 13.6673 1.33325 12.6673 1.33325 10.334V5.66732C1.33325 3.33398 2.66659 2.33398 4.66659 2.33398H11.3333C13.3333 2.33398 14.6666 3.33398 14.6666 5.66732V10.334C14.6666 12.6673 13.3333 13.6673 11.3333 13.6673Z"
                stroke="black"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.3334 6L9.24674 7.66667C8.56008 8.21333 7.43341 8.21333 6.74674 7.66667L4.66675 6"
                stroke="black"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              borderRadius: 12,
              background: '#DFDFDF',
              marginLeft: 0,
              padding: '0px 6px 0px 0px',
              color: '#000000',
              fontSize: '1.6rem',
            }}
            placeholder="Enter your email"
            inputProps={{ 'aria-label': 'enter your email' }}
          />
          <Button
            type="button"
            sx={{
              p: '6px 16px',
              backgroundColor: '#868686',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
              height: '3.6rem',
              '&:hover': {
                backgroundColor: '#2563EB',
              },
            }}
            aria-label="submit"
          >
            <Typography
              sx={{
                color: '#FFF',
                fontSize: '2rem',
                fontWeight: '700',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              Submit
            </Typography>
          </Button>
        </Paper>
      </div>
    </div>
  );
}
