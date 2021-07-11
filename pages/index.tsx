import prisma from '../lib/prisma';
import Link from 'next/link'

export default function Home() {
  return <>
    <Link href="/todo">TODO</Link>
  </>;
}
