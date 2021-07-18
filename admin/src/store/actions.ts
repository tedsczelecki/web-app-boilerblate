import { actions as dialogActions } from './reducers/dialog';

export const { open: openDialog, close: closeDialog } = dialogActions;

const actions = {
  closeDialog,
  openDialog,
};

export default actions;
