import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { mask, unmask } from 'remask';
import { MdClose } from 'react-icons/md';
import Link from 'next/link';
import { format } from 'date-fns';

import { Button, Form, Input } from '@/shared/components/ui';
import { userStore } from '@/shared/stores';
import { identificationNumberPattern, CPF } from '@/shared/helpers';

import {
  CreateCustomerData,
  createCustomerSchema,
  phonePatterns,
} from '../validators';

interface CreateCustomerFormProps {
  handleCreateAccount: (data: CreateCustomerData) => void;
}

export const CreateCustomerForm = ({
  handleCreateAccount,
}: CreateCustomerFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [passwordRequirement, setPasswordRequirement] = useState({
    characters: false,
    uppercase: false,
    lowercase: false,
    special: false,
    number: false,
  });

  const authEmail = userStore((store) => store.authEmail);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<CreateCustomerData>({
    resolver: zodResolver(createCustomerSchema),
  });

  const password = watch('password');

  useEffect(() => {
    const verificaCaracteres = password?.length >= 8;
    const verificaMaiuscula = /[A-Z]/.test(password);
    const verificaMinuscula = /[a-z]/.test(password);
    const verificaEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const verificaNumero = /[0-9]/.test(password);

    setPasswordRequirement({
      characters: verificaCaracteres,
      uppercase: verificaMaiuscula,
      lowercase: verificaMinuscula,
      special: verificaEspecial,
      number: verificaNumero,
    });
  }, [password]);

  const onChangePhoneMask = (phone: string) => {
    setValue('phone', mask(unmask(phone), phonePatterns));
    if (errors.phone) {
      clearErrors('phone');
    }
  };

  const identificationNumberValidation = (identificationNumber: string) => {
    const isInValid = CPF.create(identificationNumber) === 'invalid';

    if (isInValid) {
      setError('identificationNumber', {
        message: 'CPF inválido',
      });

      return 'invalid';
    }

    clearErrors('identificationNumber');
  };

  const prepareFormData = (data: CreateCustomerData) => {
    if (
      identificationNumberValidation(data.identificationNumber) === 'invalid'
    ) {
      return;
    }

    try {
      const formData: CreateCustomerData = {
        ...data,
        phone: unmask(data.phone),
      };

      handleCreateAccount(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeIdentificationNumber = (identificationNumber: string) => {
    if (identificationNumber.length >= 13) {
      identificationNumberValidation(identificationNumber);
    }

    setValue(
      'identificationNumber',
      mask(unmask(identificationNumber), identificationNumberPattern),
    );
  };

  const passwordRequirements =
    Object.values(passwordRequirement).every(Boolean);

  return (
    <>
      <Link href={'/'}>
        <MdClose className="absolute right-4 top-4 cursor-pointer text-3xl" />
      </Link>

      <Form onSubmit={handleSubmit(prepareFormData)}>
        <div className='my-20'>
          <div className="mb-[22px] mt-5">
            <h1 className="mb-2 text-2xl font-bold lg:text-[34px]">
              Cadastre-se
            </h1>
            <span className="text-base text-white-600 lg:text-base">
              preencha os dados abaixo e conclua seu cadastro.
            </span>
          </div>

          <div className="flex max-w-[400px] flex-col">
            <div className="flex flex-col md:flex-row md:gap-2">
              <Input
                className="h-[46px]"
                placeholder="Digite seu nome"
                {...register('name')}
                size="full"
                variant="outline"
                error={errors.name?.message ? errors.name?.message : '\u00A0'}
                testId="input-name-create-customer"
              />
              <Input
                className="h-[46px]"
                placeholder="Sobrenome"
                {...register('surname')}
                size="full"
                variant="outline"
                testId="input-surname-create-customer"
                error={
                  errors.surname?.message ? errors.surname?.message : '\u00A0'
                }
              />
            </div>

            <div className="mb-0">
              <Input
                className="h-[46px]"
                placeholder="Digite seu e-mail"
                error={errors.email?.message ? errors.email?.message : '\u00A0'}
                defaultValue={authEmail}
                size="full"
                variant="outline"
                testId="input-email-create-customer"
                {...register('email')}
              />

              <Input
                className="h-[46px]"
                placeholder="CPF"
                size="full"
                variant="outline"
                testId="input-identification-number-create-customer"
                {...register('identificationNumber')}
                onChange={(event) =>
                  onChangeIdentificationNumber(event.target.value)
                }
              />
              <span className="mb-2 flex flex-col text-xs text-red-400">
                {errors.identificationNumber?.message
                  ? errors.identificationNumber?.message
                  : '\u00A0'}
              </span>
            </div>

            <div className="mb-4 flex w-full flex-row">
              <div className="mr-1">
                <Input
                  className="h-[46px] w-16"
                  placeholder="DDD"
                  maxLength={2}
                  variant="outline"
                  {...register('areaCode')}
                  testId="input-ddd-create-customer"
                />
              </div>
              <Input
                className="h-[46px] w-full"
                placeholder="99999-9999"
                {...register('phone')}
                onChange={(event) => onChangePhoneMask(event.target.value)}
                variant="outline"
                testId="input-phone-create-customer"
                minLength={9}
              />
            </div>
            {Object.keys(errors).length > 0 && (
              <span className="-mt-4 flex flex-col text-xs text-red-400">
                {errors.areaCode?.message ? errors.areaCode?.message : '\u00A0'}
                &nbsp;
                {errors.phone?.message ? errors.phone?.message : '\u00A0'}
              </span>
            )}
            <div className="flex flex-col gap-2">
              <Input
                classNameContainer="relative"
                className="h-[46px]"
                placeholder="Digite sua senha"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                testId="input-password-create-customer"
                size="full"
                variant="outline"
              >
                <div className="absolute right-2 top-[20px] mt-1 -translate-y-1/2 transform cursor-pointer px-2 text-xl">
                  {showPassword ? (
                    <HiEye onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <HiEyeOff onClick={() => setShowPassword(!showPassword)} />
                  )}
                </div>
              </Input>
              <div className="-mt-1 mb-2 ml-1 text-xs text-white-500">
                Mínimo de
                <span
                  className={
                    passwordRequirement.characters
                      ? 'ml-1 text-green-500'
                      : 'ml-1 text-red-500'
                  }
                >
                  8 caracteres
                </span>
                , contendo, uma
                <span
                  className={
                    passwordRequirement.uppercase
                      ? 'ml-1 text-green-500'
                      : 'ml-1 text-red-500'
                  }
                >
                  letra maíuscula
                </span>
                , uma
                <span
                  className={
                    passwordRequirement.lowercase
                      ? 'ml-1 text-green-500'
                      : 'ml-1 text-red-500'
                  }
                >
                  letra minúscula
                </span>
                , um
                <span
                  className={
                    passwordRequirement.special
                      ? 'mx-1 text-green-500'
                      : 'mx-1 text-red-500'
                  }
                >
                  caracter especial
                </span>
                e um
                <span
                  className={
                    passwordRequirement.number
                      ? 'ml-1 text-green-500'
                      : 'ml-1 text-red-500'
                  }
                >
                  número
                </span>
                .
              </div>
            </div>
            <Input
              classNameContainer="relative"
              className="h-[46px]"
              placeholder="Confirmar senha"
              error={errors.confirmPassword?.message}
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              size="full"
              testId="input-confirm-password-create-customer"
              variant="outline"
            >
              <div className="absolute right-2 top-[20px] mt-1 -translate-y-1/2 transform cursor-pointer px-2 text-xl">
                {showConfirmPassword ? (
                  <HiEye
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                ) : (
                  <HiEyeOff
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                )}
              </div>
            </Input>
          </div>

          <Button
            testId="button-submit-create-customer"
            disabled={!passwordRequirements}
            size="default"
            className="mb-6 mt-4 h-[54px] text-base"
            variant="fill"
            type="submit"
          >
            Cadastrar
          </Button>
        </div>
      </Form>
    </>
  );
};
