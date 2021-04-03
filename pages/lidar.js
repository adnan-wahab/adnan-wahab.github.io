import Head from 'next/head'
import styles from '../styles/Home.module.css'

import 'tailwindcss/tailwind.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Adnan Wahab</title>
        <link rel="icon" href="/favicon.ico" />

      </Head>

 
      <div 
    className="antialiased"
    >
<a href="/" >Back to home page </a>
<h3>Lidar Annotation Tool(2017)</h3>
<p>
This is an anotation tool i created for Samasource to create jobs for people living in uganda
to label objects in 4D point clouds to improve sensor fusion for neural networks on self driving vehicles. 

Because the users were fairly new to using computers, the design had to be very easy to use. 

To render temporal pointclouds efficently, I hacked the THREE/potree source code to progressively update point positions for each frame.

It used WebGL, angular.js and integrated with a pre-existing rails CMS. 

<a href="http://point-cloud-adnan.surge.sh" >Click this link to view an early prototype</a>
</p>

<video src="/media/lidar2.mp4" controls ></video>
<video src="/media/lidar1.mp4" controls ></video>


    </div>
    </div>
  )
}
