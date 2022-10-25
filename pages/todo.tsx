import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
// import Link from 'next/link'
// import Image from 'next/image'
import React, { useEffect, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, login, logout } from '../stores/userSlice'
import { auth } from '../firebase'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import TodoApp from '../components/todo/TodoApp'
import styles from '../styles/Todo.module.css'

const Todo: NextPage = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()

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
        router.replace('/')
      }
    })
    return () => {
      unSub()
    }
  }, [dispatch])

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo App | GG Toolkit</title>
        <meta name='description' content='Todo App | GG Toolkit' />
      </Head>
      <main className={styles.main}>
        <Typography variant='h2' component='h1' gutterBottom>
          Todo App
        </Typography>
        {user && user.uid && <TodoApp />}
      </main>
    </div>
  )
}

export default Todo
