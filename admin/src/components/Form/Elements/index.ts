import { FORM_TEXT, FORM_TEXTAREA } from 'constants/forms/form-fields';
import { Input, Textarea } from '@chakra-ui/react';

const fields = {
  [FORM_TEXT]: Input,
  [FORM_TEXTAREA]: Textarea,
};

export default fields;
