import { Box, Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { closeDialog } from 'app/store/fuse/dialogSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLabel } from '../../../../store/labelsSlice';

export default function InputLabel() {
  const [form, setForm] = useState({
    labelName: '',
  });
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateNewlabel = () => {
    dispatch(createLabel(form.labelName));

    dispatch(
      closeDialog({
        children: <InputLabel />,
      })
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <DialogTitle>Create New Label</DialogTitle>
      <DialogContent>
        <TextField
          className="mt-16 mb-16"
          label="Label Name"
          autoFocus
          id="label-name"
          name="labelName"
          value={form.labelName}
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
                children: <InputLabel />,
              })
            );
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleCreateNewlabel}>Add</Button>
      </DialogActions>
    </Box>
  );
}
