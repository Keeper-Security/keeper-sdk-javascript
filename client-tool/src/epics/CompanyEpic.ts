import {Epic} from "redux-observable";
import {filter, map, mergeMap, tap} from 'rxjs/operators';

import {ActionType, isActionOf} from 'typesafe-actions';

import * as actions from "../actions";
import {RootState} from "../reducers";
import {Keeper} from "../service/Keeper";

type Action = ActionType<typeof actions>;

const companyEpic: Epic<Action, Action, RootState> = (action$, store) =>
    action$.pipe(
        filter(isActionOf(actions.loggedInAction)),
        mergeMap(_ => Keeper.fetchVault()),
        map(vault => actions.loadedAction(vault))
    );

export default [
    companyEpic,
];
