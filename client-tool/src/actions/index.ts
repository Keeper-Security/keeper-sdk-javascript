import {createAction} from "typesafe-actions";
import {Company, Node} from "keeperapi";

import {
    EPIC_SUCCESS,
    EPIC_FAILURE,
    LOGIN_SET_USER,
    LOGIN,
    LOGOUT,
    LOGGED_IN,
    LOADED,
    CONVERT_NODE,
    NODE_CONVERTED,
    NODE_CONVERSION_ERROR,
    ADD_TEST_NODE,
    ADD_MANAGED_COMPANY,
    LOAD_MANAGED_COMPANY
} from "../constants";

export const epicSuccessAction = createAction(EPIC_SUCCESS)();

export const epicFailureAction = createAction(EPIC_FAILURE)<any>();

export const setUserAction = createAction(LOGIN_SET_USER)<{ user: string }>();

export const loginAction = createAction(LOGIN)<{ password: string }>();

export const logoutAction = createAction(LOGOUT)();

export const loggedInAction = createAction(LOGGED_IN)();

export const loadedAction = createAction(LOADED)<Company>();

export const convertNodeAction = createAction(CONVERT_NODE)<{ node: Node }>();

export const nodeConversionErrorAction = createAction(NODE_CONVERSION_ERROR)<{ node: Node; error: any }>();

export const addTestNodeAction = createAction(ADD_TEST_NODE)<{ nodeName: string }>();

export const addManagedCompanyAction = createAction(ADD_MANAGED_COMPANY)<{ companyName: string }>();

export const loadManagedCompanyAction = createAction(LOAD_MANAGED_COMPANY)<{ companyId: number }>();

export const nodeConvertedAction = createAction(NODE_CONVERTED)();
