import { Link } from 'lucide-react';

import { navBarItems } from '../core';

import { Button } from './button';

export function SubHeader() {
  return (
    <div className="lg:bg-white-120">
      <div className="mx-56 hidden md:hidden lg:mt-10 lg:flex lg:h-14 xl:flex">
        {navBarItems.map(({ id, label, link }) => (
          <Button
            testId={`nav-item-button-${id}`}
            asChild
            variant="default"
            className="m-auto w-auto items-center justify-between text-base text-white-950"
            key={id}
          >
            <Link href={link}>{label}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
