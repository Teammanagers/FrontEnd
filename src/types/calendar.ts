export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type ModalProps = {
  date: Value;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};
