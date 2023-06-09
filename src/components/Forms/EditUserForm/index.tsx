import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  ModalFooter,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { UsersContext } from "../../../contexts/UsersContext";
import {
  IUpdateFormProps,
  IUpdateUserData,
} from "../../../interfaces/UsersContext.interfaces";

export const EditUserForm = ({ userData, onClose }: IUpdateFormProps) => {
  const { updateUser } = useContext(UsersContext);
  const registerSchema = z.object({
    first_name: z
      .string()
      .min(2, "O nome deve ter pelo menos 2 caracteres")
      .max(20, "O nome deve ter no máximo 20 caracteres")
      .optional(),
    last_name: z
      .string()
      .min(2, "O sobrenome deve ter pelo menos 2 caracteres")
      .max(20, "O sobrenome deve ter no máximo 20 caracteres")
      .optional(),
    username: z
      .string()
      .min(3, "O username deve ter pelo menos 3 caracteres")
      .max(30, "O username deve ter no máximo 20 caracteres")
      .optional(),
    password: z
      .string()
      .min(8, "O password deve ter pelo menos 8 caracteres")
      .refine((value) => /[A-Z]/.test(value), {
        message: "A senah deve ter pelo menos uma letra maiúscula",
      })
      .refine((value) => /\W/.test(value), {
        message: "A senha deve ter pelo menos um caractere especial",
      })
      .optional(),
    email: z.string().email("Insira um email válido").optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateUserData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: IUpdateUserData) => {
    const userId = userData.id;

    updateUser({ data, userId, onClose });
  };

  return (
    <>
      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w="80%"
        margin="
          1rem auto"
      >
        <FormControl isInvalid={!!errors.first_name}>
          <FormLabel>Nome</FormLabel>
          <Input
            isInvalid
            errorBorderColor={errors.first_name && "crimson"}
            focusBorderColor={errors.first_name && "crimson"}
            placeholder="Insira seu nome"
            defaultValue={userData?.first_name}
            {...register("first_name")}
          />
          {!!errors.first_name && (
            <FormErrorMessage>{errors.first_name.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.last_name}>
          <FormLabel>Sobrenome</FormLabel>
          <Input
            isInvalid
            errorBorderColor={errors.last_name && "crimson"}
            focusBorderColor={errors.last_name && "crimson"}
            placeholder="Insira seu sobrenome"
            defaultValue={userData?.last_name}
            {...register("last_name")}
          />
          {!!errors.last_name && (
            <FormErrorMessage>{errors.last_name.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            isInvalid
            errorBorderColor={errors.email && "crimson"}
            focusBorderColor={errors.email && "crimson"}
            placeholder="Insira o seu email"
            defaultValue={userData?.email}
            {...register("email")}
          />
          {!!errors.email ? (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          ) : (
            <FormHelperText>email@email.com</FormHelperText>
          )}
        </FormControl>
        <ModalFooter>
          <Button type="submit" colorScheme="blue">
            Atualizar
          </Button>
        </ModalFooter>
      </VStack>
    </>
  );
};
