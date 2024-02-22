import { Divider } from '@nextui-org/react';
import TopicCreateForm from '../components/topics/topic-create-form';
import TopicList from '../components/topics/topic-list';

export default function Home() {
  return (
    <main className='grid grid-cols-4 gap-4 p-4'>
      {/* <section>Home</section> */}
      <section className='col-span-3'>
        <h1 className='text-xl m-2'>Top Posts</h1>
      </section>
      <section className='border shadow p-3'>
        <TopicCreateForm></TopicCreateForm>
        <Divider className='my-3' />
        <TopicList></TopicList>
      </section>
    </main>
  );
}
