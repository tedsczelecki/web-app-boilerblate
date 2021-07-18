import { FORM_TEXT, FORM_TEXTAREA } from 'constants/forms/form-fields';
import { FormData } from '@types';

export const postFormData: FormData = [
  {
    label: 'Title',
    name: 'title',
    type: FORM_TEXT,
  },
  {
    label: 'Content',
    name: 'content',
    type: FORM_TEXTAREA,
  },
];
