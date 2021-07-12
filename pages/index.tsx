import prisma from '../lib/prisma';
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return <>
    <Head>
      <title>Nextjs Sandbox</title>
      <meta property="og:title" content="Nextjs Sandbox" key="title" />
    </Head>
    <h1>Menu</h1>
    <ul>
      <li>
        <Link href="/todo">TODO</Link>
      </li>
    </ul>
  </>;
}
