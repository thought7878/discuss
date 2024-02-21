import { Button } from '@nextui-org/react';
import { signIn, signOut } from '@/actions';
import { auth } from '@/auth';
import Profile from '../components/profile';

export default async function Home() {
  const session = await auth();

  return <main>Home</main>;
}
