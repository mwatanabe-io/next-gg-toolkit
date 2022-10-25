import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../stores/userSlice'
// import { firebase } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import Link from 'next/link'
import MuiLink from '@mui/material/Link'
import styles from '../../styles/Header.module.css'

const Header: React.FC = () => {
  const user = useSelector(selectUser)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await signOut(auth).catch((err) => alert(err.message))
  }

  return (
    <>
      {user.uid && (
        <Box sx={{ flexGrow: 1, mt: 3, mb: 4 }} className={styles.header}>
          <Grid container spacing={8}>
            <Grid item xs={10}>
              <Link href='/' passHref>
                <MuiLink>
                  <HomeIcon />
                </MuiLink>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Typography>Profile</Typography>
                <Tooltip title='Account settings'>
                  <IconButton
                    onClick={handleClick}
                    size='small'
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>{user.displayName.charAt(0)}</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      {user.uid && (
        <Menu
          anchorEl={anchorEl}
          id='account-menu'
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/* <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize='small' />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem> */}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}
    </>
  )
}

export default Header
