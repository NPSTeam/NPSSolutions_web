import { Box, ListItem, ListItemText, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function ButtonIndustry({
  icon,
  category,
  description,
  mainColor,
  isActive,
  handleClickItem,
}) {
  return (
    <motion.div
      key={category}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.5 }}
    >
      <ListItem
        alignItems="flex-start"
        sx={{
          width: '37rem',
          height: '11.4rem',
          background: '#FFFFFF',
          boxShadow: isActive ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none',
          borderRadius: '6px',
          margin: '0 2rem 2rem 0',
          '&:hover': { cursor: 'pointer' },
        }}
        onClick={handleClickItem}
      >
        <Box margin="2rem 2rem 0 1rem">{icon}</Box>
        <motion.div whileTap={{ scale: 1.05 }}>
          <ListItemText
            primary={category}
            primaryTypographyProps={{
              style: {
                fontWeight: '600',
                fontSize: '2.4rem ',
                display: 'inline-block',
                color: isActive ? mainColor : '#868E96',
                fontFamily: 'Poppins, "Helvetica", "Arial", sans-serif',
                borderBottom: '1px solid #343A40',
              },
            }}
            secondary={
              <>
                <Typography
                  sx={{
                    display: 'inline',
                    fontFamily: 'Roboto, "Helvetica", "Arial", sans-serif',
                    fontSize: isActive ? '1.2rem' : '1.4rem',
                    fontWeight: '400',
                    color: isActive ? '#343A40' : '#868E96',
                  }}
                  component="span"
                  variant="body2"
                >
                  {description}
                </Typography>
              </>
            }
          />
        </motion.div>
      </ListItem>
    </motion.div>
  );
}
