'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const session = useSession();

  if (session.data?.user) {
    return <div>Client Component: {JSON.stringify(session.data.user)}</div>;
  }

  return <div>Client Component: user not signed in</div>;
}
