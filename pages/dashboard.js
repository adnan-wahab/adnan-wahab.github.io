/** @format */

import Head from "next/head"
/*  */ import styles from "../styles/Home.module.css"

import "tailwindcss/tailwind.css"

export default function Home(titites) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Adnan Wahab</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='antialiased'></div>
      <h1>Analytics go here :)))))</h1>
    </div>
  )
}
