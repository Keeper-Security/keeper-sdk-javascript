import {createAction} from "typesafe-actions";
import {Company, Node} from "keeperapi";

import {
    LOGIN_SET_USER,
    LOGIN,
    LOGOUT,
    LOGGED_IN,
    LOADED,
    CONVERT_NODE,
    NODE_CONVERTED
} from "../constants";

export const setUserAction = createAction(LOGIN_SET_USER)<{ user: string }>();

export const loginAction = createAction(LOGIN)<{ password: string }>();

export const logoutAction = createAction(LOGOUT)();

export const loggedInAction = createAction(LOGGED_IN)();

export const loadedAction = createAction(LOADED)<Company>();

export const convertNodeAction = createAction(CONVERT_NODE)<{ node: Node }>();

export const nodeConvertedAction = createAction(NODE_CONVERTED)();
