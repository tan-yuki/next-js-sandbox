import prisma from '../lib/prisma';
import { GetServerSideProps } from 'next';

type Props = {
  count: number;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const count = await prisma.post.count()

  return {
    props: {
      count,
    }
  }
}

export default function Home(props: Props) {
  return <div>post count: {props.count}</div>;
}
