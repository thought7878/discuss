import { Button } from '@nextui-org/react';

export interface TopicShowPageProps {
  params: {
    topicName: string;
  };
}

export default function TopicShowPage({ params }: TopicShowPageProps) {
  const { topicName } = params;
  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-3'>
        <h1 className='text-2xl font-bold mb-2'>{topicName}</h1>
      </div>
      <div>
        <Button color='primary' type='submit'>
          Create Post
        </Button>
      </div>
    </div>
  );
}
