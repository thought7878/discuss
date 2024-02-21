'use server';

import { signIn as sIn, signOut as sOut } from '@/auth';

export async function signIn() {
  return sIn('github');
}

export async function signOut() {
  return sOut();
}
