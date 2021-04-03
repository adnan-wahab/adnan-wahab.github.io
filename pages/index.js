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
    <header className="header sm:w-20p sm:fixed top-0 bottom-0 flex flex-col items-center justify-center my-10">
      <section className="text-gray-800 flex flex-col items-center space-y-3">
        <div className={styles.a}>
         <div className={styles.b}>
           <img className={styles.c} width="130px" height="157"alt="Manu Forti" src="/media/manu.png" decoding="async"  />
         </div>
         <div className="text-center sm:max-w-44 space-y-1">
           <h1 className="uppercase font-bold text-black">Adnan Wahab</h1>
           <h3 className="text-sm">
             Software Engineer</h3>
            </div>
             <div className="flex space-x-2">
               <a className="text-gray-800 hover:text-black transition-all duration-300" href="https://twitter.com/adnan_wahab_" title="My Twitter">
                 <svg viewBox="0 0 512 512" height="25" width="25" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="StyledIconBase-ea9ulj-0 jZGNBW">
                   <path d="M496 109.5a201.8 201.8 0 01-56.55 15.3 97.51 97.51 0 0043.33-53.6 197.74 197.74 0 01-62.56 23.5A99.14 99.14 0 00348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 002.54 22.1 280.7 280.7 0 01-203-101.3A95.69 95.69 0 0036 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0135.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 01-25.94 3.4 94.38 94.38 0 01-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0139.5 405.6a203 203 0 01-23.5-1.4A278.68 278.68 0 00166.74 448c181.36 0 280.44-147.7 280.44-275.8 0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 00496 109.5z"></path></svg>
                 </a>
                 <a className="text-gray-800 hover:text-black transition-all duration-300" href="https://github.com/adnan-wahab" title="My GitHub">
                  <svg viewBox="0 0 512 512" height="25" width="25" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="StyledIconBase-ea9ulj-0 jZGNBW">
                    <path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z"></path></svg></a><a className="text-gray-800 hover:text-black transition-all duration-300" href="mailto:adnan@hey.com" title="Say hello">
                   <svg viewBox="0 0 512 512" height="25" width="25" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="StyledIconBase-ea9ulj-0 jZGNBW"><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z"></path></svg></a>
                 </div>
                 </div>
               </section>
             </header>

      <div className="text-blue-700 article space-y-5 my-10 sm:my-10p sm:ml-25p">
        <p>
          <a href="http://nyc-map.com" className="hover:underline">
            <span>Crib Finder: Data Driven Apartment Hunting</span>
          <img className="object-cover h-48" src="/media/map.png" />
        </a>
    </p>

    <p> 
        <a href="http://point-cloud-adnan.surge.sh" className="hover:underline">
          Lidar PointCloud Annotation Tool Developed for Samasource
          <img className="object-cover h-48" src="https://i.ytimg.com/vi/hvrE5RL5nrQ/maxresdefault.jpg" />
      </a>
    </p>

    <p> 
       <a href="http://adnan-graph-viz.surge.sh" className="hover:underline">
        Webgl Network Graph Visualization Library
        <img className="object-cover h-48" src="https://www.johndcook.com/color_graph.png" />
        </a>
    </p>

    <p>
        <a href="http://adnan-pbr.surge.sh" className="hover:underline">
          Primer on Physically Based Rendering
          <img className="object-cover h-48" src="/media/light.jpg" />
          </a>
        </p>
      </div>
    </div>
    </div>
  )
}
