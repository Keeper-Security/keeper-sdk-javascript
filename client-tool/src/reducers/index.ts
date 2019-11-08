import { combineReducers } from "redux";

import { companyReducer, CompanyState } from "./CompanyReducer";
import { loginReducer, LoginState } from "./LoginReducer";

export type RootState = {
  login: LoginState;
  company: CompanyState;
};

const reducers = combineReducers({
  login: loginReducer,
  company: companyReducer,
});

export default reducers;
