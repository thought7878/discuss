'use server';

import { z } from 'zod';
import { auth } from '@/auth';

export interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, { message: 'Must be lowercase letters or dashes' }),
  description: z.string().min(10),
});

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  // if not sign in
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ['Must be signed in first'] } };
  }

  if (!result.success) {
    // console.log(result.error.flatten().fieldErrors);
    return { errors: result.error.flatten().fieldErrors };
  }

  return {
    errors: {},
  };
}
