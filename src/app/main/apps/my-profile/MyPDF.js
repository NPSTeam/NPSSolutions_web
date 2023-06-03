import { Paper } from '@mui/material';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';

function MyPdf() {
  const file = 'https://africau.edu/images/default/sample.pdf';
  const type = 'pdf';
  return (
    <Paper>
      <FileViewer fileType={type} filePath={file} errorComponent={CustomErrorComponent} />
    </Paper>
  );
}
export default MyPdf;
