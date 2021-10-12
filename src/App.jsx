import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";

// React Toastify 
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// React Cookies
import { withCookies } from "react-cookie";

// Redux
// import { Provider } from 'react-redux';
// import store from './store';
// import { loadUser } from './actions/auth';
// import setAuthToken from './utils/setAuthToken';


// Standard Components
import { Grid, makeStyles } from "@material-ui/core";
import Add from "./components/Add";
import Feed from "./components/Feed";
import Leftbar from "./components/Leftbar";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";


// Pages
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register";
import Profile from "./pages/Profile"
// import Dashboard from "./pages/Dashboard"

// Boards
import Board from "./sample/Board"


const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    hide: {
      display: "none !important"
    },
    show: {
      display: "block"
    }
  },
}));

// function App(props) {
//   const [auth, setAuth] = useState(false);

//   useEffect(() => {
//     const token = props.cookies.get("auth_token");
//     // can show auth_token | undefined

//     if (!token) {
//       return setAuth(false);
//     } else {
//       return setAuth(true);
//     }
//   }, [props.cookies]);


const App = () => {
  const classes = useStyles();
  const route = window.location.pathname.replace('/', '')
  const isAddtionalCompsTobeVisible = (route == "register") || (route == "login") || (route == "landing") ? "none" : "block";
  return (
    <Router>
      <div>
        <Navbar isVisible={isAddtionalCompsTobeVisible} />
        <Grid container>
          <Grid item sm={2} xs={2}>
            <Leftbar isVisible={isAddtionalCompsTobeVisible} />
          </Grid>
          <Grid item sm={7} xs={10}>
            {/* <Feed /> */}

            <Switch>

              {/* <ProtectedLogin
              path="/login-user"
              auth={auth}
              setAuth={setAuth}
              component={Login}
            />

            <ProtectedRoute
              path="/dashboard"
              auth={auth}
              setAuth={() => setAuth(true)}
              component={Dashboard}
            /> */}
              <Route path="/landing" component={Landing} />
              <Route path="/board" component={Board} />
              <Route path="/register" component={Register} />
              <Route path="/profile" component={Profile} />
              <Route path="/login" component={Login} />
              <Route path="/boards" component={Feed} />
            </Switch>
          </Grid>
          <Grid item sm={3} className={classes.right}>
            <Rightbar isVisible={isAddtionalCompsTobeVisible} />
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

// const ProtectedRoute = ({ auth, setAuth, component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={() => (auth ? <Component /> : <Redirect to="/login-user" />)}
//     />
//   );
// };

// const ProtectedLogin = ({ auth, setAuth, component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={() => (auth ? <Redirect to="/dashboard" /> : <Component />)}
//     />
//   );
// };
// }

export default withCookies(App);