export const DIALOG_TYPE_ALERT = 'alert';
export const DIALOG_TYPE_INFO = 'info';
export const DIALOG_DEFAULT_DATA = {
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
  content: '',
  onCancel: () => {},
  onClose: () => {},
  onConfirm: () => {},
  title: '',
  type: DIALOG_TYPE_INFO,
};
