import {ActionsObservable, StateObservable} from "redux-observable";
import {filter, map, mergeMap, tap} from 'rxjs/operators';

import {ActionType, isActionOf} from 'typesafe-actions';

import * as actions from "../actions";
import {RootState} from "../reducers";
import {Keeper} from "../service/Keeper";

type Action = ActionType<typeof actions>;

function companyLoggedInEpic(action$: ActionsObservable<Action>, store: StateObservable<RootState>) {
    return action$.pipe(
        filter(isActionOf(actions.loggedInAction)),
        mergeMap(_ => Keeper.fetchCompany()),
        map(company => actions.loadedAction(company))
    );
}

function nodeConvertEpic(action$: ActionsObservable<Action>, store: StateObservable<RootState>) {
    return action$.pipe(
        filter(isActionOf(actions.convertNodeAction)),
        mergeMap(x => Keeper.convertNode(x.payload.node, store.value.company.company!)),
        map(company => actions.nodeConvertedAction())
    );
}

export default [
    companyLoggedInEpic,
    nodeConvertEpic
];
