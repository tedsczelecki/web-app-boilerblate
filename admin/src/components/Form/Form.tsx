import React from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { FormData } from '../../@types';
import { Field, Formik } from 'formik';
import elements from './Elements';

type FormProps<T> = {
  buttonLabel?: string;
  formData: FormData;
  formId?: string;
  initialValues?: T;
  onSubmit: (values: T) => void;
  showSubmitButton?: boolean;
};

function Form<T>({
  buttonLabel = 'Submit',
  formData,
  formId = '',
  initialValues,
  onSubmit,
  showSubmitButton = true,
}: FormProps<T>) {
  return (
    <Formik
      initialValues={initialValues ?? {}}
      onSubmit={(values, actions) => {
        onSubmit?.(values as T);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form id={formId} onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {formData.map(({ label, name, placeholder, type }) => {
              const FormComponent = elements[type] as React.ElementType;

              if (!FormComponent) {
                console.error(`Component for form type "${type}" not found.`);
                return null;
              }

              const id = `form-element-${name}`;

              return (
                <Field name={name} key={id}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors[name] && form.touched[name]}
                    >
                      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
                      <FormComponent
                        {...field}
                        id={id}
                        placeholder={placeholder}
                      />
                      <FormErrorMessage>
                        {form?.errors?.[name]}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              );
            })}
            {showSubmitButton && (
              <HStack justifyContent="end" width="100%">
                <Button
                  ml="auto"
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  {buttonLabel}
                </Button>
              </HStack>
            )}
          </VStack>
        </form>
      )}
    </Formik>
  );
}

export default Form;
