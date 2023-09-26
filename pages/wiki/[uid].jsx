import * as prismicH from '@prismicio/helpers'
import { SEO } from '../../components'
import { RichText } from 'prismic-reactjs'
import sm from '../../sm.json'

import { createClient } from '../../prismicio'
import Image from 'next/image'


const BlogPost = ({ page }) => {
  return (
    <>
      <SEO 
        page={page.data.title?.[0]?.text}
        description={page.data.title?.[0]?.text}
      />

      <div>
        <img
          src={page.data.image.url} 
          alt={page.data.image.alt}
          height={200}
          width={350}
        />

        <h1>{page.data.title?.[0]?.text}</h1>

        <div>
          <RichText render={page.data.content} />
        </div>
      </div>
    </>
  )
}

export default BlogPost

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData })

  const page = await client.getByUID('wikipage', params.uid)

  return {
    props: {
      page,
    },
  }
}

export async function getStaticPaths() {
  const client = createClient(sm.apiEndpoint)

  const wikiPages = await client.getAllByType('wikipage')

  return {
    paths: wikiPages.map((post) => prismicH.asLink(post)),
    fallback: false,
  }
}