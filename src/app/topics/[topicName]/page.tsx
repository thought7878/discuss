import { Button } from '@nextui-org/react';
import PostCreateForm from '@/components/posts/create-post-form';

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
        <PostCreateForm topicName={topicName} />
      </div>
    </div>
  );
}
