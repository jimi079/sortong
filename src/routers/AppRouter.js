import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Appfirst from '../App'

import Board from '../components/Board'
import Login from '../components/Login'
import Register from '../components/Register'
import NotFound from '../components/NotFound'

import {
  checkTokenValidity,
  fetchUserInfo,
} from '../actions/actionCreators/userActions'

const AppRouter = () => {
  const { isValid, userRequest, token } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isValid) {
      dispatch(fetchUserInfo(token))
    }
  }, [isValid, token, dispatch])

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    let token = localStorage.getItem('auth-token')
    if (token === null) {
      localStorage.setItem('auth-token', '')
      token = ''
    }
    dispatch(checkTokenValidity(token))
    //* eslint-disable next-line *//
  }, [])

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/:user/boards" component={app} />
          <Route path="/b/:id/:name?">
            <Board />
          </Route>
          {!userRequest || !isValid ? <Route component={NotFound} /> : null}
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default AppRouter