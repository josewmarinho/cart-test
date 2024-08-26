import { useRouter } from 'next/router';
import { useState } from 'react';

import { createUserServices } from '@/modules/auth/services';
import { CreateCustomerData } from '@/modules/auth/validators';
import { userStore } from '@/shared/stores';
import { CreateCustomerForm } from '@/modules/auth/components';

export default function CreateAccountPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAccount = async (data: CreateCustomerData) => {
      setIsLoading(true);
      await createUserServices(data);
      router.push('/')
   
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
        <div className="m-auto flex lg:justify-between">
          <CreateCustomerForm
            handleCreateAccount={handleCreateAccount}
          />
        </div>
      </div>
    </main>
  );
}
