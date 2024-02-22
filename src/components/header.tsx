'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  Button,
  Avatar,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { signIn, signOut } from '@/actions';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';

export default function Header() {
  const session = useSession();

  let authContent: ReactNode = null;
  if (session.status === 'loading') {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement='left'>
        <PopoverTrigger>
          <Avatar src={session.data.user.image || ''} />
        </PopoverTrigger>
        <PopoverContent>
          <div className='p-4'>
            <form action={signOut}>
              <Button type='submit'>Sign out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={signIn}>
            <Button type='submit' color='secondary' variant='bordered'>
              Sign in
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={signIn}>
            <Button type='submit' color='primary' variant='flat'>
              Sign up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }

  return (
    <Navbar className='shadow mb-6'>
      <NavbarBrand>
        <Link href={'/'} className='font-bold'>
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>{authContent}</NavbarContent>
    </Navbar>
  );
}
