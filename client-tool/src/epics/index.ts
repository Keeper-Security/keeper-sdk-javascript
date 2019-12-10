import {combineEpics} from "redux-observable";

import appEpic from "./AppEpic";
import loginEpic from "./LoginEpic";
import companyEpic from "./CompanyEpic";

const epics = combineEpics(
    ...appEpic,
    ...loginEpic,
    ...companyEpic
);

export default epics;
