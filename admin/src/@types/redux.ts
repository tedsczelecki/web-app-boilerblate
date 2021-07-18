import { DIALOG_TYPE_ALERT, DIALOG_TYPE_INFO } from '../constants/redux';

export type DialogDataAppState = {
  cancelLabel: string;
  confirmLabel: string;
  content: string;
  onCancel: () => void;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  type: typeof DIALOG_TYPE_ALERT | typeof DIALOG_TYPE_INFO;
};
export type DialogAppState = {
  data: DialogDataAppState;
  visible: boolean;
};

export type AppState = {
  dialog: DialogAppState;
};
