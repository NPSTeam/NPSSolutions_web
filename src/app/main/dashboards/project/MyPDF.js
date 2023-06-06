import { Paper } from '@mui/material';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';

function MyPdf() {
  const file = 'https://minio.s3.mismart.ai/trung-mua/CV_PhanThanhSang_FlutterDeveloperIntern.pdf';
  const type = 'pdf';
  return (
    <Paper>
      <FileViewer fileType={type} filePath={file} errorComponent={CustomErrorComponent} />
    </Paper>
  );
}
export default MyPdf;
