import React from 'react'
import { db } from '../../firebase'
import { updateDoc, doc, deleteDoc } from 'firebase/firestore'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'
import { motion } from 'framer-motion'
import styles from '../../styles/Todo.module.css'
import { TableRow, TableCell } from '@mui/material'

interface PROPS {
  id: string
  title: string
  complete: boolean
}

const Todo: React.FC<PROPS> = (props) => {
  const deleteTodo = async (e: any) => {
    const docRef = doc(db, 'tasks', props.id)
    await deleteDoc(docRef)
  }

  const completeTodo = async (e: any) => {
    const docRef = doc(db, 'tasks', props.id)
    updateDoc(docRef, {
      complete: !props.complete,
    })
  }
  return (
    <>
      <TableRow key={props.id}>
        <TableCell className={styles.stateCell}>
          {props.complete ? (
            <CheckCircleRoundedIcon
              className={styles.completeIcon}
              onClick={completeTodo}
              fontSize='large'
            />
          ) : (
            <CheckCircleOutlineRoundedIcon
              className={styles.completeIcon}
              onClick={completeTodo}
              fontSize='large'
            />
          )}{' '}
        </TableCell>
        <TableCell className={styles.titleCell}>
          <div className={styles.title}>{props.title}</div>
        </TableCell>
        <TableCell align='right'>
          <motion.div>
            <HighlightOffRoundedIcon
              className={styles.removeIcon}
              onClick={deleteTodo}
              fontSize='large'
            />
          </motion.div>
        </TableCell>
      </TableRow>
    </>
  )
}
export default Todo
