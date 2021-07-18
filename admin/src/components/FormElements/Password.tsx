import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

type PasswordFieldProps = InputProps & {
  onChange?: (value: string) => void;
  showForgotPassword?: boolean;
  value?: string;
};

export const PasswordField = React.forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>(({ onChange = () => {}, showForgotPassword, value }, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const mergeRef = useMergeRefs(inputRef, ref);

  const onClickReveal = () => {
    onToggle();
    const input = inputRef.current;
    if (input) {
      input.focus({ preventScroll: true });
      const length = input.value.length * 2;
      requestAnimationFrame(() => {
        input.setSelectionRange(length, 99999);
      });
    }
  };

  return (
    <FormControl id="password">
      <Flex justify="space-between">
        <FormLabel>Password</FormLabel>
        {showForgotPassword && (
          <Box
            as="a"
            color={mode('blue.600', 'blue.200')}
            fontWeight="semibold"
            fontSize="sm"
          >
            Forgot Password?
          </Box>
        )}
      </Flex>
      <InputGroup>
        <InputRightElement>
          <IconButton
            colorScheme="gray"
            bg="transparent !important"
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          ref={mergeRef}
          name="password"
          type={isOpen ? 'text' : 'password'}
          autoComplete="current-password"
          required
          value={value}
          onChange={evt => onChange(evt.target.value)}
        />
      </InputGroup>
    </FormControl>
  );
});

PasswordField.displayName = 'PasswordField';
export default PasswordField;
