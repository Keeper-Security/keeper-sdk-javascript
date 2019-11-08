import {combineEpics} from "redux-observable";

import loginEpic from "./LoginEpic";
import companyEpic from "./CompanyEpic";

const epics = combineEpics(
    ...loginEpic,
    ...companyEpic
);

export default epics;
