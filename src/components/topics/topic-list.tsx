import { db } from '@/db';
import Link from 'next/link';
import paths from '@/path';
import { Chip } from '@nextui-org/react';

async function TopicList() {
  const topics = await db.topic.findMany();

  const topicList = topics.map((t) => {
    return (
      <Link key={t.id} href={paths.topicShow(t.slug)}>
        <Chip color='warning' variant='shadow'>
          {t.slug}
        </Chip>
      </Link>
    );
  });

  return (
    <div className='flex flex-col text-lg items-center gap-2'>{topicList}</div>
  );
}

export default TopicList;
