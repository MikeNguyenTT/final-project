import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardItem from './DashboardItem'
import DeleteProjectForm from './Forms/DeleteProjectForm'
import NewProjectForm from './Forms/NewProjectForm'
import EditProjectForm from './Forms/EditProjectForm'
import {
	NEW_PROJECT_FORM,
	DELETE_PROJECT_FORM,
	PROJECT_VIEW
} from './constants/Modes'
import { MANAGER_LEVEL } from './constants/AccessLevel'
import { styled, useTheme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

export default function Dashboard (props) {
  const {
		mode,
		setMode,
		viewMode,
		setViewMode,
		user,
		currentProject,
		setCurrentProject,
		loadForm,
		modals,
		openModals,
		closeModals
	} = props

  const [openDrawer, setOpenDrawer] = useState(false)
  const [projects, setProjects] = useState()
  const [dashboardProjects, setDashboardProjects] = useState()
  const stateRef = useRef()
  stateRef.current = dashboardProjects

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  const drawerWidth = 240

  const openedMixin = theme => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
  })

  const closedMixin = theme => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`
    }
  })

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
    ...theme.mixins.toolbar
  }))

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'openDrawer'
  })(({ theme, openDrawer }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(openDrawer && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }))

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'openDrawer'
  })(({ theme, openDrawer }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(openDrawer && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!openDrawer && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  }))

	// function purgeNullStates (states) {
	//   const results = []

	//   if (stateRef.current) {
	//     for (const state of states) {
	//       if (state !== null) {
	//         results.push(state)
	//       }
	//     }
	//   }

	//   return results
	// }

  let index = 0

  function selectProject (index) {
    if (stateRef.current[index]) {
      axios
				.get(
					process.env.REACT_APP_BACKEND_URL +
						'/projects/' +
						stateRef.current[index].id +
						'/columns'
				)
				.then(res => {
  setCurrentProject(prev => {
    return { ...stateRef.current[index], Columns: res.data }
  })
})
    }
  }

  useEffect(() => {
    axios
			.get(process.env.REACT_APP_BACKEND_URL + `/projects/${user.id}`)
			.then(res => {
  const data = res.data.map(
					project_assignment => project_assignment.Project
				)
  setDashboardProjects(data)
				// setProjects(data)
  selectProject(0)

				// const data = stateRef.current.map(project =>
				// 	<DashboardItem
				// 		key={project.id}
				// 		value={project.name}
				// 		listIndex={index++}
				// 		currentProject={currentProject}
				// 		dashItemProject={project}
				// 		setCurrentProject={setCurrentProject}
				// 		selectProject={selectProject}
				// 		viewMode={viewMode}
				// 		setViewMode={setViewMode}
				// 		loadForm={loadForm}
				// 		user={user}
				// 	/>
				// );
})
			.catch(err => {
  console.log(err)
})
  }, [])

  const generateDashbord = function () {
    const data = dashboardProjects.map(project =>
      <DashboardItem
        key={project.id}
        value={project.name}
        listIndex={index++}
        currentProject={currentProject}
        dashItemProject={project}
        setCurrentProject={setCurrentProject}
        selectProject={selectProject}
        viewMode={viewMode}
        setViewMode={setViewMode}
        loadForm={loadForm}
        modals={modals}
        openModals={openModals}
        closeModals={closeModals}
			/>
		)

    return data
  }

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: 'fit-content',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 'fit-content',
          boxSizing: 'border-box'
        }
      }}
		>
      {modals.deleteProjectForm &&
      <DeleteProjectForm
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        setViewMode={setViewMode}
        modals={modals}
        closeModals={closeModals}
        dashboardProjects={dashboardProjects}
        setDashboardProjects={setDashboardProjects}
				/>}
      {modals.newProjectForm &&
      <NewProjectForm
        user={user}
        setViewMode={setViewMode}
        modals={modals}
        closeModals={closeModals}
        setProjects={setProjects}
        dashboardProjects={dashboardProjects}
        setDashboardProjects={setDashboardProjects}
				/>}
      {modals.editProjectForm &&
      <EditProjectForm
        user={user}
        setViewMode={setViewMode}
        modals={modals}
        closeModals={closeModals}
        setProjects={setProjects}
        dashboardProjects={dashboardProjects}
        setDashboardProjects={setDashboardProjects}
				/>}
      <Box sx={{ overflow: 'auto' }}>
        <List component='nav' aria-label='main mailbox folders'>
          {projects}
          {dashboardProjects !== undefined && generateDashbord()}
          {user.access_level == MANAGER_LEVEL &&
          <ListItemButton value='Create New Project'>
            <ListItemIcon />
            <ListItemText
              primary='Create New Project'
              onClick={() => openModals('newProjectForm')}
							/>
          </ListItemButton>}
        </List>
      </Box>
    </Drawer>
  )
}
{
	/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar> */
}
