import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import Link from 'next/link';
import { MdClose } from 'react-icons/md';

import { Button, Form, Input } from '@/shared/components/ui';
import { userStore } from '@/shared/stores';

import { LoginCustomerData, loginCustomerSchema } from '../validators';

interface LoginFormProps {
  handleLogin: (data: LoginCustomerData) => void;
}

export const LoginForm = ({ handleLogin }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const authEmail = userStore((store) => store.authEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCustomerData>({
    resolver: zodResolver(loginCustomerSchema),
  });

  return (
    <>
      <Link href={'/'}>
        <MdClose className="absolute right-4 top-4 cursor-pointer text-3xl" />
      </Link>

      <Form onSubmit={handleSubmit(handleLogin)}>
        <div className="lg:w-[373px] my-20">
          <div className="mb-4">
            <h1 className="mb-2 text-2xl font-bold lg:text-4xl">Acessar</h1>
            <span className=" text-sm font-medium text-white-600 lg:text-base">
              Digite seu e-mail no campo abaixo
            </span>
          </div>

          <div className="relative mb-2 flex">
            <Input
              className="h-[52px]"
              placeholder="Digite username"
              {...register('username')}
              defaultValue={authEmail}
              size="full"
              variant="outline"
            />
          </div>

          <div className="relative mb-2 flex">
            <Input
              className="h-[52px]"
              placeholder="Digite sua senha"
              error={errors.password?.message}
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              variant="outline"
              size="full"
              testId="input-password-login"
            />
            {showPassword ? (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 transform cursor-pointer p-2 text-xl">
                <HiEye onClick={() => setShowPassword(!showPassword)} />
              </div>
            ) : (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 transform cursor-pointer p-2 text-xl">
                <HiEyeOff onClick={() => setShowPassword(!showPassword)} />
              </div>
            )}
          </div>

          <Button
            testId="button-login-submit"
            className="h-[54px] p-4 text-base"
            variant="fill"
            size="default"
            type="submit"
          >
            Acessar
          </Button>
        </div>
      </Form>
    </>
  );
};
