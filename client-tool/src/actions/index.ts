import {createAction} from "typesafe-actions";

import {
    LOGIN_SET_USER,
    LOGIN,
    LOGOUT,
    LOGGED_IN,
    LOADED,
} from "../constants";

export const setUserAction = createAction(LOGIN_SET_USER)<{ user: string }>();

export const loginAction = createAction(LOGIN)<{ password: string }>();

export const logoutAction = createAction(LOGOUT)();

export const loggedInAction = createAction(LOGGED_IN)();

export const loadedAction = createAction(LOADED)();
