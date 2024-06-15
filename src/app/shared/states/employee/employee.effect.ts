import { Injectable, inject } from "@angular/core";
import { EmployeeApiService } from "@services/api/employee-api.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as EmployeeActions from './employee.action'
import { catchError, map, of, switchMap } from 'rxjs';
import { Store } from "@ngrx/store";

@Injectable()
export class EmployeeEffect {

    private api = inject(EmployeeApiService);
    action$ = inject(Actions);
    store$ = inject(Store)
    
    // constructor(private api: EmployeeApiService, private action$: Actions) {}

    loadEmployee$ = createEffect(() =>
        this.action$.pipe(
            ofType(EmployeeActions.loadEmployee),
            switchMap(() => {
                if (!this.api) {
                    throw new Error('EmployeeApiService is not provided');
                }
                this.store$.dispatch(EmployeeActions.loadEmployeeLoading({isLoading: true}));
                return this.api.getEmployee().pipe(
                    map((res) => {
                        // this.store$.dispatch(EmployeeActions.loadEmployeeLoading({isLoading: false}));
                        setTimeout(() => this.store$.dispatch(EmployeeActions.loadEmployeeLoading({isLoading: false})), 1000);
                        return EmployeeActions.loadEmployeeSuccess({ employees: res });
                    }),
                    catchError((error: { message: string }) => {
                        this.store$.dispatch(EmployeeActions.loadEmployeeLoading({isLoading: false}));
                        return of(
                            EmployeeActions.loadEmployeeFailure({
                                errorMessage: 'Fail to load employee',
                            })
                        )
                    })
                );
            })
        )
    );
}