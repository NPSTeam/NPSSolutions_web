import LabelsDialog from '../label/LabelsDialog';
import MailList from './MailList';
import MailsToolbar from './MailsToolbar';

function Mails(props) {
  return (
    <div className="flex flex-col w-full">
      <MailsToolbar onToggleLeftSidebar={props.onToggleLeftSidebar} />
      <MailList />
      <LabelsDialog />
    </div>
  );
}

export default Mails;
