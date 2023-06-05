import { IconButton, Typography, Box, Divider, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import InputContent from './Input';
import { deleteChatContent, setTargetId, updateChatContent } from '../../store/systemSettingsSlice';

const defaultValues = {
  chatContent: '',
  // contentUser: '',
};
export default function ChatAITab() {
  const dispatch = useDispatch();

  const chatContent = useSelector(
    ({ systemSettingsApp }) => systemSettingsApp.systemSettings.content
  );

  return (
    <main className="main">
      <InputContent />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '60rem',
          overflowY: 'auto',
        }}
      >
        {chatContent.map((content, index) => (
          <form
            name="chatAIForm"
            noValidate
            key={index}
            // className="flex flex-col justify-center w-full mt-32"
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography width={100} textTransform="uppercase">
                {content.role}
              </Typography>
              {content.role === 'user' && (
                <TextField
                  //  minRows={6}
                  multiline
                  autoFocus
                  type="text"
                  //  error={!!errors.contentUser}
                  //  helperText={errors?.contentUser?.message}
                  variant="outlined"
                  required
                  fullWidth
                  defaultValue={content?.content}
                  onChange={() => {
                    dispatch(updateChatContent({ data: content }));
                  }}
                />
              )}
              {content.role === 'assistant' && (
                <TextField
                  multiline
                  autoFocus
                  type="text"
                  variant="outlined"
                  required
                  fullWidth
                  defaultValue={content?.content}
                />
              )}
              <IconButton
                onClick={() => {
                  dispatch(setTargetId(content.id));
                  dispatch(deleteChatContent());
                }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Box>
            <Divider sx={{ margin: '12px 0' }} />
          </form>
        ))}
      </Box>
    </main>
  );
}
