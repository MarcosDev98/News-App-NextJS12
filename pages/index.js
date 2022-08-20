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
            <img src={article.urlToImage} alt={`Image for the article ${article}`} />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}

export async function getServerSideProps() {
  const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2022-07-20&sortBy=publishedAt&apiKey=c2c374e104ca4b7d90e991491c85174e')

  const { articles } = await response.json()

  return {
    props: {
      articles
    }
  }
  
}