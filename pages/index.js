import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import PageLayout from '../components/PageLayout'

export default function Home({ articles }) {



  return (
    <PageLayout title='NewsApp - Home'>
      <div className={styles.container}>

        {articles.length === 0 && <p>No tenemos articulos</p>}

        {articles.length > 0 && articles.map((article, index) => (
          <div key={index}>
            <Image 
              src={article.urlToImage} 
              alt={`Image for the article ${article}`}
              width='450'
              height='300'
              layout='responsive'
              quality={50}
              priority={index < 2}
              placeholder='empty'
              />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}


  //  ESTE METODO SE EJECUTA EN EL SERVIDOR
  // N request -> se ejecuta N veces
  // para datos que necesitas que sean muy live
  // o porque tiene demasiados datos dinamicos

// export async function getServerSideProps() {
//   const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2022-07-21&sortBy=publishedAt&apiKey=c2c374e104ca4b7d90e991491c85174e')

//   const { articles } = await response.json()

//   return {
//     props: {
//       articles
//     }
//   }
  
// }



// Nos permite crear paginas estaticas.
// N request -> se ejecuta 1 vez en build time (o para refrescar la pagina)
export async function getStaticProps() {
  const response = await fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=c2c374e104ca4b7d90e991491c85174e')

  const { articles } = await response.json()

  return {
    props: {
      articles
    }
  }
  
}