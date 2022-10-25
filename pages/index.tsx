import React, { useEffect, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, login, logout } from '../stores/userSlice'
import { auth } from '../firebase'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Auth from '../components/Auth'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          }),
        )
      } else {
        dispatch(logout())
      }
    })
    return () => {
      unSub()
    }
  }, [dispatch])

  return (
    <div className={styles.container}>
      <Head>
        <title>GG Toolkit</title>
        <meta name='description' content='GGの業務に役立つかもしれないツール集' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        {user.uid && (
          <div className={styles.app}>
            <h1 className={styles.title}>Welcome to GG Toolkit</h1>

            <p className={styles.description}>js上級課題</p>

            <div className={styles.grid}>
              <Link href='/todo'>
                <a className={styles.card}>
                  <h2>Todo</h2>
                  <p>進捗管理</p>
                </a>
              </Link>
            </div>
          </div>
        )}
        {!user.uid && <Auth />}
      </main>
    </div>
  )
}

export default Home
