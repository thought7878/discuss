import { Button } from '@nextui-org/react';
import { signIn, signOut } from '@/actions';
import { auth } from '@/auth';
import Profile from '../components/profile';

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <form action={signIn}>
        <Button type='submit' color='primary'>
          Sign In
        </Button>
      </form>
      <form action={signOut}>
        <Button type='submit' color='primary'>
          Sign Out
        </Button>
      </form>

      {session?.user ? (
        <div>{JSON.stringify(session.user)}</div>
      ) : (
        <div>Signed out</div>
      )}

      <Profile />
    </main>
  );
}
