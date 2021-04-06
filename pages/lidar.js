/** @format */

import Head from "next/head"
import styles from "../styles/Home.module.css"

import "tailwindcss/tailwind.css"

export default function Lidar() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Adnan Wahab</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='antialiased p-5'>
        <a
          className='hover:bg-pink-500 text-purple-500  underline hover:text-purple-900'
          href='/'>
          Back to home page
        </a>
        <h3 className='text-xl'>Lidar Annotation Tool(2017)</h3>
        <p>
          This is an anotation tool i created for Samasource to create jobs for
          people living in uganda to label objects in 4D point clouds to improve
          sensor fusion for neural networks on self driving vehicles. Because
          the users were fairly new to using computers, the design had to be
          very easy to use. To render temporal pointclouds efficently, I hacked
          the THREE/potree source code to progressively update point positions
          for each frame. It used WebGL, angular.js and integrated with a
          pre-existing rails CMS.
          <a
            className='text-purple-500  underline hover:text-purple-900'
            href='http://point-cloud-adnan.surge.sh'>
            Click this link to view an early prototype
          </a>
        </p>
        <div className='flex'>
          <video src='/media/lidar2.mp4' controls></video>
          <video src='/media/lidar1.mp4' controls></video>
        </div>
      </div>
    </div>
  )
}
