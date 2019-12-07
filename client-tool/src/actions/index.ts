import {createAction} from "typesafe-actions";
import {Company, Node, LoginError} from "keeperapi";

import {
    EPIC_SUCCESS,
    EPIC_FAILURE,
    LOGIN_SET_USER,
    LOGIN,
    SECOND_FACTOR_PROMPT,
    SECOND_FACTOR_SUBMIT,
    LOGOUT,
    LOGGED_IN,
    LOGIN_FAILURE,
    LOADED,
    REFRESH,
    PROGRESS,
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

export const secondFactorPromptAction = createAction(SECOND_FACTOR_PROMPT)<string | undefined>();

export const secondFactorSubmitAction = createAction(SECOND_FACTOR_SUBMIT)<string>();

export const logoutAction = createAction(LOGOUT)();

export const loggedInAction = createAction(LOGGED_IN)();

export const loginFailureAction = createAction(LOGIN_FAILURE)<LoginError>();

export const loadedAction = createAction(LOADED)<Company>();

export const refreshAction = createAction(REFRESH)();

export const progressAction = createAction(PROGRESS)<boolean>();

export const convertNodeAction = createAction(CONVERT_NODE)<{ node: Node }>();

export const nodeConversionErrorAction = createAction(NODE_CONVERSION_ERROR)<{ node: Node; error: any }>();

export const addTestNodeAction = createAction(ADD_TEST_NODE)<{ nodeName: string }>();

export const addManagedCompanyAction = createAction(ADD_MANAGED_COMPANY)<{ companyName: string }>();

export const loadManagedCompanyAction = createAction(LOAD_MANAGED_COMPANY)<{ companyId: number }>();

export const nodeConvertedAction = createAction(NODE_CONVERTED)();
