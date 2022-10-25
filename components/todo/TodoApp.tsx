import { motion } from 'framer-motion'
import TodoList from './TodoList'
import CompleteTodoList from './CompleteTodoList'
import styles from '../../styles/Todo.module.css'

const TodoApp = () => {
  return (
    <>
      <motion.div className={styles.todoApp}>
        <TodoList />
        <CompleteTodoList />
      </motion.div>
    </>
  )
}

export default TodoApp
