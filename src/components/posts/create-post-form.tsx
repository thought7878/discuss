'use client';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';
import { createPost } from '@/actions';
import { useFormState } from 'react-dom';
import FormButton from '@/components/common/form-button';

export interface PostCreateFormProps {
  topicName: string;
}

export default function PostCreateForm({ topicName }: PostCreateFormProps) {
  const [formState, formAction] = useFormState(
    createPost.bind(null, topicName),
    {
      errors: {},
    }
  );

  return (
    <div className='flex justify-center'>
      <Popover placement='left'>
        <PopoverTrigger>
          <Button color='primary'>Create a post</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={formAction} className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-large'>Create a post</h3>
            <Input
              name='title'
              label={'Title'}
              labelPlacement='outside'
              placeholder='Title'
              isInvalid={!!formState.errors?.title}
              errorMessage={formState.errors?.title?.join(', ')}
            />
            <Textarea
              name='content'
              label='Content'
              labelPlacement='outside'
              placeholder='Content'
              isInvalid={!!formState.errors?.content}
              errorMessage={formState.errors?.content?.join(', ')}
            />
            {/* <input type='hidden' name='topicName' /> */}

            {formState.errors?._form ? (
              <div className='text-red-400'>{formState.errors._form}</div>
            ) : null}

            <FormButton>Create</FormButton>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
