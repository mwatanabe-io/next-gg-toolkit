import React, { useState } from 'react'
import styles from '../styles/Auth.module.css'
import { useDispatch } from 'react-redux'
// import { updateUserProfile } from '../stores/userSlice'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Modal,
  IconButton,
  Box,
  Container,
} from '@mui/material'
import CameraIcon from '@mui/icons-material/Camera'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const Auth: React.FC = () => {
  const dispatch = useDispatch()
  // const [isLogin, setIsLogin] = useState(true)

  const signInGoogle = async () => {
    await signInWithPopup(auth, provider).catch((err) => alert(err.message))
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5' align='center' marginBottom={2}>
          {/* {isLogin ? 'Login' : 'Register'} */}
          SignIn
        </Typography>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          startIcon={<CameraIcon />}
          onClick={signInGoogle}
        >
          SignIn with Google
        </Button>
      </Box>
    </Container>
  )
}
export default Auth
