'use client';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';
import { createTopic } from '@/actions';
import { useFormState } from 'react-dom';
import type { CreateTopicFormState } from '@/actions/create-topic';
import FormButton from '@/components/common/form-button';

export default function TopicCreateForm() {
  const [formState, formAction] = useFormState(createTopic, {
    errors: {},
  });

  return (
    <div className='flex justify-center'>
      <Popover placement='left'>
        <PopoverTrigger>
          <Button color='primary'>Create a topic</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={formAction} className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-large'>Create a topic</h3>
            <Input
              name='name'
              label={'Name'}
              labelPlacement='outside'
              placeholder='Name'
              isInvalid={!!formState.errors?.name}
              errorMessage={formState.errors?.name?.join(', ')}
            />
            <Textarea
              name='description'
              label='Description'
              labelPlacement='outside'
              placeholder='Description'
              isInvalid={!!formState.errors?.description}
              errorMessage={formState.errors?.description?.join(', ')}
            />
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
