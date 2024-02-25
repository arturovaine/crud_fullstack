
import {
  IconPlusSquare,
  IconFloppyDiskSave,
  IconPencilEdit,
  IconSlashCancel,
  IconTrashDelete
} from '../../assets/Icons';

const Btn = ({ Icon, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      {...props}>
      <Icon />
    </button>
  );
};

const CreateBtn = (props) => <Btn Icon={IconPlusSquare} {...props} />;
const SaveBtn = (props) => <Btn Icon={IconFloppyDiskSave} {...props} />;
const EditBtn = (props) => <Btn Icon={IconPencilEdit} {...props} />;
const DeleteBtn = (props) => <Btn Icon={IconTrashDelete} {...props} />;
const CancelBtn = (props) => <Btn Icon={IconSlashCancel} {...props} />;

export {
  CreateBtn,
  SaveBtn,
  EditBtn,
  DeleteBtn,
  CancelBtn
};
