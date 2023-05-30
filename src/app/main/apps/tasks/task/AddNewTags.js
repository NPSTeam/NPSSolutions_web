import { Box, Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { closeDialog } from 'app/store/fuse/dialogSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTags } from '../store/tagsSlice';

export default function AddNewTags() {
  const [form, setForm] = useState({
    tagName: '',
  });
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateNewTags = () => {
    dispatch(createTags(form.tagName));

    dispatch(
      closeDialog({
        children: <AddNewTags />,
      })
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <DialogTitle>Create New Tag</DialogTitle>
      <DialogContent>
        <TextField
          className="mt-16 mb-16"
          label="Tag Name"
          autoFocus
          id="tag-name"
          name="tagName"
          value={form.tagName}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            dispatch(
              closeDialog({
                children: <AddNewTags />,
              })
            );
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleCreateNewTags}>Add</Button>
      </DialogActions>
    </Box>
  );
}
