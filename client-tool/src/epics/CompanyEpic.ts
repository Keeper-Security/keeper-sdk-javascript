import {ActionsObservable, StateObservable} from "redux-observable";
import {catchError, filter, map, mergeMap, tap} from 'rxjs/operators';

import {ActionType, isActionOf} from 'typesafe-actions';

import * as actions from "../actions";
import {RootState} from "../reducers";
import {Keeper} from "../service/Keeper";
import {of, from} from "rxjs";

type Action = ActionType<typeof actions>;

function companyLoggedInEpic(action$: ActionsObservable<Action>, store: StateObservable<RootState>) {
    return action$.pipe(
        filter(isActionOf([actions.loggedInAction, actions.epicSuccessAction, actions.nodeConvertedAction])),
        mergeMap(_ => from(Keeper.fetchCompany()).pipe(
            map(company => actions.loadedAction(company)),
            catchError(error => of(actions.epicFailureAction(error)))
        ))
    );
}

function nodeConvertEpic(action$: ActionsObservable<Action>, store: StateObservable<RootState>) {
    return action$.pipe(
        filter(isActionOf(actions.convertNodeAction)),
        mergeMap(x => from(Keeper.convertNode(x.payload.node, store.value.company.company!)).pipe(
            map(_ => actions.nodeConvertedAction()),
            catchError(error => of(actions.nodeConversionErrorAction({ node: x.payload.node, error })))
        ))
    );
}

function addTestNodeEpic(action$: ActionsObservable<Action>, store: StateObservable<RootState>) {
    return action$.pipe(
        filter(isActionOf(actions.addTestNodeAction)),
        mergeMap(x => from(Keeper.addTestNodeNode(x.payload.nodeName, store.value.company.company!)).pipe(
            map(_ => actions.epicSuccessAction()),
            catchError(error => of(actions.epicFailureAction(error)))
        ))
    );
}

function addManagedCompanyEpic(action$: ActionsObservable<Action>, store: StateObservable<RootState>) {
    return action$.pipe(
        filter(isActionOf(actions.addManagedCompanyAction)),
        mergeMap(x => from(Keeper.addManagedCompany(x.payload.companyName, store.value.company.company!)).pipe(
            map(_ => actions.epicSuccessAction()),
            catchError(error => of(actions.epicFailureAction(error)))
        ))
    );
}

function loadManagedCompanyEpic(action$: ActionsObservable<Action>, store: StateObservable<RootState>) {
    return action$.pipe(
        filter(isActionOf(actions.loadManagedCompanyAction)),
        mergeMap(x => from(Keeper.loadManagedCompany(x.payload.companyId, store.value.company.company!)).pipe(
            map(_ => actions.epicSuccessAction()),
            catchError(error => of(actions.epicFailureAction(error)))
        ))
    );
}

export default [
    companyLoggedInEpic,
    nodeConvertEpic,
    addTestNodeEpic,
    addManagedCompanyEpic,
    loadManagedCompanyEpic
];
