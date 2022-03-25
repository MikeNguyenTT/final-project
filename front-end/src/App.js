import './App.css'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import {
	LANDING_VIEW,
	LOGIN_FORM,
	REGISTER_FORM,
	ABOUT_VIEW,
	NEW_PROJECT_FORM,
	NEW_TICKET_FORM,
	PROJECT_VIEW,
	DELETE_PROJECT_FORM,
	DASH_VIEW,
	DELETE_TICKET_FORM,
	NEW_COLUMN_FORM
} from './components/constants/Modes'
import LoginForm from './components/Forms/LoginForm'
import RegistrationForm from './components/Forms/RegistrationForm'
import ProjectView from './components/ProjectView'
import AboutPage from './components/AboutPage'
import Paper from '@mui/material/Paper'
import NewProjectForm from './components/Forms/NewProjectForm'
import NewTicketForm from './components/Forms/NewTicketForm'
import { HR_LEVEL } from './components/constants/AccessLevel'
import HRPage from './components/HRPage'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import NavbarMenu from './components/NavbarMenu'
import Dashboard from './components/Dashboard'
import { styled } from '@mui/system'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const App = () => {
  const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [currentProject, setCurrentProject] = useState()
  const [currentTicket, setCurrentTicket] = useState()
  const [currentColumn, setCurrentColumn] = useState('')
  const [viewMode, setViewMode] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState()
  const [dashboard, setDashboard] = useState()
  const [allEmployees, setAllEmployees] = useState()

	// MODAL STATE
  const [modals, setModals] = useState({
    loginForm: false,
    registerForm: false,
    newProjectForm: false,
    newTicketForm: false,
    newColumnForm: false,
    editColumnForm: false,
    deleteProjectForm: false,
    deleteColumnForm: false,
    deleteTicketForm: false
  })

  function openModals (prop) {
    console.log('open modals', prop, modals)
    setModals({ ...modals, [prop]: true })
  }

  function closeModals (prop) {
    console.log('close modals', prop, modals)
    setModals({ ...modals, [prop]: false })
  }

  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#3D405B'
      },
      secondary: {
        main: '#E07A5F'
      },
      error: {
        main: '#AE2012'
      },
      warning: {
        main: '#EE9B00'
      },
      success: {
        main: '#17c3b2'
      },
      info: {
        main: '#81B29A'
      },
      background: {
        default: '#FEF9EF'
      },
      divider: '#E07A5F'
    },

    components: {
			// Name of the component ⚛️
      MuiButtonBase: {
        defaultProps: {
					// The default props to change
          disableRipple: true // No more ripple, on the whole application 💣!
        }
      }
    }
  })

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

  return (
    <ThemeProvider theme={theme}>
      <Container className='App'>
        {modals.loginForm &&
        <LoginForm
          setViewMode={setViewMode}
          setUser={setUser}
          setCookie={setCookie}
          modals={modals}
          closeModals={closeModals}
          setRefresh={setRefresh}
          setAllEmployees={setAllEmployees}
					/>}
        {modals.registerForm &&
        <RegistrationForm
          setViewMode={setViewMode}
          setUser={setUser}
          setCookie={setCookie}
          modals={modals}
          closeModals={closeModals}
          setRefresh={setRefresh}
					/>}

        <AppBar
          position='fixed'
          sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
				>
          <Toolbar>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}
						>
							PRODUCTIVITY MANAGER APP
						</Typography>
            <NavbarMenu
              viewMode={viewMode}
              setViewMode={setViewMode}
              user={user}
              setUser={setUser}
              cookies={cookies}
              removeCookie={removeCookie}
              modals={modals}
              openModals={openModals}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
						/>
          </Toolbar>
        </AppBar>
        <Offset />
        {user !== null &&
        <Dashboard
          viewMode={viewMode}
          setViewMode={setViewMode}
          user={user}
          setUser={setUser}
						// userProjects={userProjects}
						// setUserProjects={setUserProjects}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
						// data={data}
						// loadForm={loadForm}
						// open={open}
						// setOpen={setOpen}
          modals={modals}
          openModals={openModals}
          closeModals={closeModals}
          allEmployees={allEmployees}
					/>}
        {user !== null && user.access_level == HR_LEVEL && <HRPage />}
        {user === null && <AboutPage user={user} />}
        {user !== null &&
					user.access_level != HR_LEVEL &&
					<ProjectView
  user={user}
  currentProject={currentProject}
  setCurrentProject={setCurrentProject}
  setViewMode={setViewMode}
  setCurrentColumn={setCurrentColumn}
  currentTicket={currentTicket}
  setCurrentTicket={setCurrentTicket}
  currentColumn={currentColumn}
  modals={modals}
  closeModals={closeModals}
  openModals={openModals}
					/>}
      </Container>
    </ThemeProvider>
  )
}

export default App
