import {createAction} from "typesafe-actions";

import {
    LOGIN,
    LOGGED_IN,
    LOADED,
} from "../constants";

export const loginAction = createAction(LOGIN)<{ user: string, password: string }>();

export const loggedInAction = createAction(LOGGED_IN)<string>();

export const loadedAction = createAction(LOADED)();
