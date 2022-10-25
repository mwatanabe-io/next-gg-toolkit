import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../stores/userSlice'
import { db } from '../../firebase'
import { collection, onSnapshot, addDoc, query, where } from 'firebase/firestore'
import { motion } from 'framer-motion'
import Todo from './Todo'
import { Box, TableContainer, Table, TableBody } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from '../../styles/Todo.module.css'

const CompleteTodoList = () => {
  interface Todo {
    id: string
    title?: string
    complete?: boolean
    uid?: string
  }

  const user = useSelector(selectUser)
  const [tasks, setTasks] = useState<Todo[]>([])
  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    const q = query(
      collection(db, 'tasks'),
      where('uid', '==', user.uid),
      where('complete', '==', true),
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
      <Box sx={{ mt: 10 }} />
      <Accordion sx={{ mt: 10 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='complete-todo-content'
          id='complete-todo-header'
        >
          <Typography>Complete TodoList</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <motion.div layout>
            <TableContainer>
              <Table>
                <TableBody>
                  {tasks
                    ? tasks.map((task) => (
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
        </AccordionDetails>
      </Accordion>
    </>
  )
}
export default CompleteTodoList
