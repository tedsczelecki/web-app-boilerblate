import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from 'store/actions';
import { getDialogState } from 'store/selectors';
import { DIALOG_DEFAULT_DATA, DIALOG_TYPE_ALERT } from 'constants/redux';

const DialogProvider = () => {
  const dispatch = useDispatch();
  const { data, visible } = useSelector(getDialogState);

  const {
    cancelLabel,
    confirmLabel,
    content,
    onClose: onDataClose,
    onConfirm,
    title,
    type,
  } = data ?? DIALOG_DEFAULT_DATA;

  const handleClose = () => {
    onDataClose();
    dispatch(closeDialog());
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={visible} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{content}</ModalBody>

        <ModalFooter>
          <Button onClick={handleClose} variant="ghost" mr={3}>
            {cancelLabel}
          </Button>
          <Button
            colorScheme={type === DIALOG_TYPE_ALERT ? 'red' : 'blue'}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DialogProvider;
