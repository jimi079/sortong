import React from 'react';
import {
  Link,
  Avatar,
  Container,
  ImageList,
  ImageListItem,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import DateTime from './Date';


//Fullcalendar and Realted Plugins
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
import listPlugin from '@fullcalendar/list'; //For List View


const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    paddingTop: theme.spacing(10),
    position: "sticky",
    top: 0,
    backgroundColor: "#eceff1",
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: "#555",
  },
  link: {
    marginRight: theme.spacing(2),
    color: "#555",
    fontSize: 16,
  },
}));


const Rightbar = (props) => {
  const classes = useStyles();

  return (

    <Container className={classes.container} style={{ display: props && props.isVisible }}>
      <DateTime></DateTime>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'today prev next',
          right: 'dayGridMonth,dayGridDay,listWeek'
        }}
        events={[
          { title: 'event 1', date: '2020-08-13' },
          { title: 'event 2', date: '2020-08-15' },
          { title: 'event 2', date: '2020-08-15' },
          { title: 'event 2', date: '2020-08-15' },
          { title: 'event 2', date: '2020-08-15' },
          { title: 'event 2', date: '2020-08-15' },
          { title: 'event 2', date: '2020-08-15' }
        ]}
      />
    </Container>
  )
}


// import {
//     Link,
//     Avatar,
//     Container,
//     ImageList,
//     ImageListItem,
//     makeStyles,
//     Typography,
//     Divider,
//   } from "@material-ui/core";
//   import { AvatarGroup } from "@material-ui/lab";

//   const useStyles = makeStyles((theme) => ({
//     container: {
//       paddingTop: theme.spacing(10),
//       position: "sticky",
//       top: 0,
//     },
//     title: {
//       fontSize: 16,
//       fontWeight: 500,
//       color: "#555",
//     },
//     link: {
//       marginRight: theme.spacing(2),
//       color: "#555",
//       fontSize: 16,
//     },
//   }));

//   const Rightbar = () => {
//     const classes = useStyles();
//     return (
//       <Container className={classes.container}>
//         <Typography className={classes.title} gutterBottom>
//           Online Friends
//         </Typography>
//         <AvatarGroup max={6} style={{ marginBottom: 20 }}>
//           <Avatar
//             alt="Remy Sharp"
//             src="https://material-ui.com/static/images/avatar/1.jpg"
//           />
//           <Avatar
//             alt="Travis Howard"
//             src="https://material-ui.com/static/images/avatar/2.jpg"
//           />
//           <Avatar
//             alt="Cindy Baker"
//             src="https://material-ui.com/static/images/avatar/3.jpg"
//           />
//           <Avatar alt="Agnes Walker" src="" />
//           <Avatar
//             alt="Trevor Henderson"
//             src="https://material-ui.com/static/images/avatar/6.jpg"
//           />
//           <Avatar
//             alt="Trevor Henderson"
//             src="https://material-ui.com/static/images/avatar/7.jpg"
//           />
//           <Avatar
//             alt="Trevor Henderson"
//             src="https://material-ui.com/static/images/avatar/8.jpg"
//           />
//         </AvatarGroup>
//         <Typography className={classes.title} gutterBottom>
//           Gallery
//         </Typography>
//         <ImageList rowHeight={100} style={{ marginBottom: 20 }} cols={2}>
//           <ImageListItem>
//             <img
//               src="https://material-ui.com/static/images/image-list/breakfast.jpg"
//               alt=""
//             />
//           </ImageListItem>
//           <ImageListItem>
//             <img
//               src="https://material-ui.com/static/images/image-list/burgers.jpg"
//               alt=""
//             />
//           </ImageListItem>
//           <ImageListItem>
//             <img
//               src="https://material-ui.com/static/images/image-list/camera.jpg"
//               alt=""
//             />
//           </ImageListItem>
//           <ImageListItem>
//             <img
//               src="https://material-ui.com/static/images/image-list/morning.jpg"
//               alt=""
//             />
//           </ImageListItem>
//           <ImageListItem>
//             <img
//               src="https://material-ui.com/static/images/image-list/hats.jpg"
//               alt=""
//             />
//           </ImageListItem>
//           <ImageListItem>
//             <img
//               src="https://material-ui.com/static/images/image-list/vegetables.jpg"
//               alt=""
//             />
//           </ImageListItem>
//         </ImageList>
//         <Typography className={classes.title} gutterBottom>
//           Categories
//         </Typography>
//         <Link href="#" className={classes.link} variant="body2">
//           Sport
//         </Link>
//         <Link href="#" className={classes.link} variant="body2">
//           Food
//         </Link>
//         <Link href="#" className={classes.link} variant="body2">
//           Music
//         </Link>
//         <Divider flexItem style={{marginBottom:5}}/>
//         <Link href="#" className={classes.link} variant="body2">
//           Movies
//         </Link>
//         <Link href="#" className={classes.link} variant="body2">
//           Science
//         </Link>
//         <Link href="#" className={classes.link} variant="body2">
//           Life
//         </Link>
//       </Container>
//     );
//   };

export default Rightbar;