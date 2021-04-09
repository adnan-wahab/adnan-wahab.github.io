/** @format */

import Head from "next/head"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Adnan Wahab - Portolio</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='antialiased'>
        <header className='header sm:w-20p sm:fixed top-0 bottom-0 flex flex-col items-center justify-center my-10'>
          <section className='text-gray-800 flex flex-col items-center space-y-3'>
            <div className={styles.a}>
              <div className={styles.b}>
                <img
                  className={styles.c}
                  width='130px'
                  height='157'
                  src='/adnan.jpg'
                  decoding='async'
                  className='rounded-full p-3 ml-4'
                />
              </div>
              <div className='text-center sm:max-w-44 space-y-1'>
                <h1 className='uppercase font-bold text-black'>Adnan Wahab</h1>
                <h3 className='text-sm'>Software Engineer & Designer</h3>
              </div>
              <div className='flex space-x-2 ml-10'>
                <a
                  className='text-gray-800 hover:text-black transition-all duration-300'
                  href='https://observablehq.com/@adnan-wahab'
                  title='My Twitter'>
                  <svg
                    viewBox='0 0 25 28'
                    height='25'
                    width='25'
                    aria-hidden='true'
                    focusable='false'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                    className='StyledIconBase-ea9ulj-0 jZGNBW'>
                    <path d='M12.5 22.6667C11.3458 22.6667 10.3458 22.4153 9.5 21.9127C8.65721 21.412 7.98339 20.7027 7.55521 19.8654C7.09997 18.9942 6.76672 18.0729 6.56354 17.1239C6.34796 16.0947 6.24294 15.0483 6.25 14C6.25 13.1699 6.30417 12.3764 6.41354 11.6176C6.52188 10.8598 6.72292 10.0894 7.01563 9.30748C7.30833 8.52555 7.68542 7.84763 8.14479 7.27274C8.62304 6.68378 9.24141 6.20438 9.95208 5.87163C10.6979 5.51244 11.5458 5.33333 12.5 5.33333C13.6542 5.33333 14.6542 5.58467 15.5 6.08733C16.3428 6.588 17.0166 7.29733 17.4448 8.13459C17.8969 8.99644 18.2271 9.9103 18.4365 10.8761C18.6448 11.841 18.75 12.883 18.75 14C18.75 14.8301 18.6958 15.6236 18.5865 16.3824C18.4699 17.1702 18.2639 17.9446 17.9719 18.6925C17.6698 19.4744 17.2948 20.1524 16.8427 20.7273C16.3906 21.3021 15.7927 21.7692 15.0479 22.1284C14.3031 22.4876 13.4542 22.6667 12.5 22.6667ZM14.7063 16.2945C15.304 15.6944 15.6365 14.864 15.625 14C15.625 13.1073 15.326 12.3425 14.7292 11.7055C14.1313 11.0685 13.3885 10.75 12.5 10.75C11.6115 10.75 10.8688 11.0685 10.2708 11.7055C9.68532 12.3123 9.36198 13.1405 9.375 14C9.375 14.8927 9.67396 15.6575 10.2708 16.2945C10.8688 16.9315 11.6115 17.25 12.5 17.25C13.3885 17.25 14.124 16.9315 14.7063 16.2945ZM12.5 27C19.4031 27 25 21.1792 25 14C25 6.82075 19.4031 1 12.5 1C5.59687 1 0 6.82075 0 14C0 21.1792 5.59687 27 12.5 27Z'></path>
                  </svg>
                </a>
                <a
                  className='text-gray-800 hover:text-black transition-all duration-300'
                  href='https://github.com/adnan-wahab'
                  title='My GitHub'>
                  <svg
                    viewBox='0 0 512 512'
                    height='25'
                    width='25'
                    aria-hidden='true'
                    focusable='false'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                    className='StyledIconBase-ea9ulj-0 jZGNBW'>
                    <path d='M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z'></path>
                  </svg>
                </a>
                <a
                  className='text-gray-800 hover:text-black transition-all duration-300'
                  href='mailto:adnan@hey.com'
                  title='Say hello'>
                  <svg
                    viewBox='0 0 512 512'
                    height='25'
                    width='25'
                    aria-hidden='true'
                    focusable='false'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                    className='StyledIconBase-ea9ulj-0 jZGNBW'>
                    <path d='M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z'></path>
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </header>

        <div className='text-blue-700 article space-y-5 my-10 sm:my-10p sm:ml-25p'>
          <p>
            <a href='http://nyc-map.com' className='hover:underline'>
              <span>Crib Finder: Data Driven Apartment Hunting</span>
              <img className='object-cover h-48' src='/media/map.png' />
            </a>
          </p>

          <p>
            <a href='/lidar' className='hover:underline'>
              Lidar PointCloud Annotation Tool Developed for Samasource
              <img className='object-cover h-48' src='/lidar.jpeg' />
            </a>
          </p>

          <p>
            <a
              href='http://adnan-graph-viz.surge.sh'
              className='hover:underline'>
              Webgl Network Graph Visualization Library
              <img className='object-cover h-48' src='/graph.png' />
            </a>
          </p>

          <p>
            <a href='http://adnan-pbr.surge.sh' className='hover:underline'>
              Primer on Physically Based Rendering
              <img className='object-cover h-48' src='/media/light.jpg' />
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
