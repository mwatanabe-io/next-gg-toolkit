import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../stores/userSlice'
import { db } from '../../firebase'
import { collection, onSnapshot, addDoc, query, where } from 'firebase/firestore'
import { motion } from 'framer-motion'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { TableContainer, Table, TableBody, TextField } from '@mui/material'
import Todo from './Todo'
import styles from '../../styles/Todo.module.css'

const TodoList = () => {
  interface Todo {
    id: string
    title?: string
    complete?: boolean
    uid?: string
  }

  const user = useSelector(selectUser)
  const [tasks, setTasks] = useState<Todo[]>([])
  const [title, setTitle] = useState<string>('')

  const handleOnChange = (e: any) => {
    setTitle(e.target.value)
  }

  const createTodo = () => {
    try {
      const docRef = addDoc(collection(db, 'tasks'), {
        title: title,
        uid: user.uid,
        complete: false,
      })
    } catch (e) {
      console.error(e)
    }
    setTitle('')
  }

  useEffect(() => {
    const q = query(
      collection(db, 'tasks'),
      where('uid', '==', user.uid),
      where('complete', '==', false),
    )
    const unSub = onSnapshot(q, (querySnapshot) => {
      const todos: Todo[] = []
      querySnapshot.forEach((doc) => {
        todos.push({ ...doc.data(), id: doc.id })
      })
      setTasks(todos)
    })
  }, [user.uid])

  return (
    <>
      <div className={styles.addTodo}>
        <div className={styles.addTodoInput}>
          <TextField
            variant='standard'
            label='Add Todo'
            type='text'
            value={title}
            onChange={handleOnChange}
            className={styles.textField}
            size='medium'
          />
        </div>
        <div className={styles.addIconBox}>
          {title === '' ? (
            <AddCircleOutlineOutlinedIcon fontSize='large' className={styles.addDisabledIcon} />
          ) : (
            <AddCircleRoundedIcon
              onClick={createTodo}
              fontSize='large'
              className={styles.addIcon}
            />
          )}
        </div>
      </div>
      <h2>TodoList</h2>
      <motion.div layout>
        <TableContainer>
          <Table>
            <TableBody>
              {tasks
                ? tasks.map((task: Todo) => (
                    <Todo
                      key={task.id}
                      id={task.id}
                      title={task.title!}
                      complete={task.complete!}
                    />
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </>
  )
}
export default TodoList
