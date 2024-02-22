'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import type { Post } from '@prisma/client';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import paths from '../path';
import { revalidatePath } from 'next/cache';

export interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export async function createPost(
  topicName: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  // validate with zod
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
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
  let post: Post;
  try {
    // throw new Error('create post failed!!!');

    // find topic id by topic name
    const topic = await db.topic.findFirst({ where: { slug: topicName } });
    if (!topic) {
      throw new Error('Do not have topic, checkout please!');
    }

    //
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        topicId: topic.id,
        userId: session.user.id,
      },
    });
    // post = await db.post.create({data:{}})
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: { _form: [error.message] },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong! Wait a minute to create post'],
        },
      };
    }
  }

  // update topic show
  revalidatePath(paths.topicShow(topicName));

  redirect(paths.postShow(topicName, post.id));
}
