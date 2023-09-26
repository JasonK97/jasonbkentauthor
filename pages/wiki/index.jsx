import React from 'react'
import sm from '../../sm.json'
import { SEO } from '../../components'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

import { createClient } from '@prismicio/client'

export default function Wiki({ wikiPages }) {
  return (
    <>
      <SEO 
        page={`Wiki of the Eight Kingdoms`}
        description={`Extensive Wiki for the world of Folahr, where Embers of the Eternals books take place.`}
      />

      <div className={styles.page_wrapper}>
        <h1>Wiki of the Eight Kingdoms</h1>

        {wikiPages.map(post => (
          <Link key={post.data.title?.[0]?.text} href={`/wiki/${post?.uid}`}>{post.data.title?.[0]?.text}</Link>
        ))}
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const client = createClient(sm.apiEndpoint)

  const wikiPages = await client.getAllByType('wikipage')

  return {
    props: {
      wikiPages,
    },
  }
}