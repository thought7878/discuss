'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import type { Topic } from '@prisma/client';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import paths from '../path';
import { revalidatePath } from 'next/cache';

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
  // validate with zod
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  // if not sign in
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ['Must be signed in first'] } };
  }

  // zod validate fail
  if (!result.success) {
    // console.log(result.error.flatten().fieldErrors);
    return { errors: result.error.flatten().fieldErrors };
  }

  // save to database
  let topic: Topic;
  try {
    // throw new Error('create topic failed!!!');
    topic = await db.topic.create({
      data: { slug: result.data.name, description: result.data.description },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: { _form: [error.message] },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong! Wait a minute to create topic'],
        },
      };
    }
  }

  // update home
  revalidatePath('/');

  redirect(paths.topicShow(topic.slug));
}
