import { useRouter } from 'next/router';
import Image from 'next/image';

import { loginCustomerServices } from '@/modules/auth/services';
import { LoginForm } from '@/modules/auth/components';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (data: any) => {
      await loginCustomerServices(data);
      router.push('/');
  };


  return (
    <main className="min-h-screen">
      <div className="flex min-h-screen w-full flex-col justify-center bg-cover bg-no-repeat lg:grid lg:grid-cols-2">
        <div
         
          className="flex min-h-[350px] items-center justify-center bg-black-50 bg-flowgames-black bg-cover bg-center lg:min-h-fit lg:bg-cover lg:bg-no-repeat"
        >
          <div className="hidden px-10 py-10">
           {/* LOGO */}
          </div>
        </div>
        <div className="m-auto flex flex-col items-center justify-center lg:justify-between">
          <LoginForm handleLogin={handleLogin} />
        </div>
      </div>
    </main>
  );
}
