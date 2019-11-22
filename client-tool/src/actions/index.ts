import {createAction} from "typesafe-actions";
import {Company, Node} from "keeperapi";

import {
    EPIC_SUCCESS,
    LOGIN_SET_USER,
    LOGIN,
    LOGOUT,
    LOGGED_IN,
    LOADED,
    CONVERT_NODE,
    NODE_CONVERTED,
    ADD_TEST_NODE
} from "../constants";

export const epicSuccessAction = createAction(EPIC_SUCCESS)();

export const setUserAction = createAction(LOGIN_SET_USER)<{ user: string }>();

export const loginAction = createAction(LOGIN)<{ password: string }>();

export const logoutAction = createAction(LOGOUT)();

export const loggedInAction = createAction(LOGGED_IN)();

export const loadedAction = createAction(LOADED)<Company>();

export const convertNodeAction = createAction(CONVERT_NODE)<{ node: Node }>();

export const addTestNodeAction = createAction(ADD_TEST_NODE)();

export const nodeConvertedAction = createAction(NODE_CONVERTED)();
