// import './main.css'
import axios from 'axios'

import _ from 'lodash'
import moment from 'moment'

import { useEffect, useLayoutEffect, useRef, useState, Suspense } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import createStore from 'zustand'
import classNames from 'classnames'

import { createBrowserHistory } from 'history'

import { faker } from '@faker-js/faker'

window.axios = axios

window._ = _
window.moment = moment

window.useEffect = useEffect
window.useLayoutEffect = useLayoutEffect
window.useRef = useRef
window.useState = useState
window.Suspense = Suspense

window.useNavigate = useNavigate
window.useParams = useParams
window.useSearchParams = useSearchParams

window.createStore = createStore
window.classNames = classNames

window._history = window.router = createBrowserHistory({ window })
window.goback = () => router.back()
window.goto = (...args) => router.push(...args)
window.navBack = () => () => router.back()
window.navTo = (...args) => () => router.push(...args)

window.faker = faker
