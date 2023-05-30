import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import NewTagForm from './NewTagForm';
import TagItemForm from './TagItemForm';
import { closeTagsDialog, selectTags, selectTagsDialogOpen } from '../../store/tagsSlice';

function TagsDialog(props) {
  const dispatch = useDispatch();
  const tagsDialogOpen = useSelector(selectTagsDialogOpen);
  const tags = useSelector(selectTags);

  return (
    <Dialog
      classes={{
        paper: 'w-full max-w-320 p-24 md:p-40 m-24',
      }}
      onClose={(ev) => dispatch(closeTagsDialog())}
      open={tagsDialogOpen}
    >
      <Typography className="text-20 mb-24 font-semibold">Edit Tags</Typography>

      <List dense>
        <NewTagForm />

        {tags.map((item) => (
          <TagItemForm tag={item} key={item.id} isLast={tags.length === 1} />
        ))}
      </List>
    </Dialog>
  );
}

export default TagsDialog;
