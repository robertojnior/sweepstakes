import type { GetServerSideProps } from 'next'
import Head from 'next/head'

type Pool = {
  code: string
  title: string
}

type PageData = {
  pools: Pool[]
}

export default function Home({ pools }: PageData) {
  return (
    <div>
      <Head>
        <title>Bettings</title>

        <meta
          name="description"
          content="Bettings app homepage. Create your betting pool!"
        />
      </Head>

      <main>
        <h1>Welcome to Bettings!</h1>

        <ul>
          {pools.map(({ code, title }, index) => (
            <li key={code}>{`${code}: ${title}`}</li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:3000/pools')

  const pools = await response.json()

  return { props: { pools } }
}
