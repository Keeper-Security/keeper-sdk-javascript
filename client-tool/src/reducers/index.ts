import {combineReducers} from "redux";

import {companyReducer, CompanyState} from "./CompanyReducer";
import {loginReducer, LoginState} from "./LoginReducer";
import {appReducer, AppState} from "./AppReducer";

export type RootState = {
    app: AppState;
    login: LoginState;
    company: CompanyState;
};

const reducers = combineReducers({
    app: appReducer,
    login: loginReducer,
    company: companyReducer,
});

export default reducers;
