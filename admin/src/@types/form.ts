import { FORM_TEXT, FORM_TEXTAREA } from 'constants/forms/form-fields';

export type FormItem = {
  label?: string;
  name: string;
  placeholder?: string;
  type: typeof FORM_TEXT | typeof FORM_TEXTAREA;
};
export type FormData = FormItem[];
