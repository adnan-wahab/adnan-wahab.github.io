/** @format */
import { useState, useEffect } from "react"
import Head from "next/head"
/*  */ import styles from "../styles/Home.module.css"

import "tailwindcss/tailwind.css"

export default function Dashboard(titites) {
  let [res, setRes] = useState()

  useEffect(() => {
    ;(async () => {
      let res = await fetch("/api/hello")
      let json = await res.json()
      setRes(setRes)
    })()
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Adnan Wahab</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='antialiased'></div>
      <h1>Analytics go here :)))))</h1>
      <div>{res}</div>
    </div>
  )
}
