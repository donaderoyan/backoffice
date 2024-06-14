import { Injectable, inject } from "@angular/core";
import { EmployeeApiService } from "@services/api/employee-api.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as EmployeeActions from './employee.action'
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class EmployeeEffect {

    private api = inject(EmployeeApiService);
    action$ = inject(Actions);
    
    // constructor(private api: EmployeeApiService, private action$: Actions) {}

    loadEmployee$ = createEffect(() =>
        this.action$.pipe(
            ofType(EmployeeActions.loadEmployee),
            switchMap(() => {
                if (!this.api) {
                    console.log('EmployeeApiService is not provided');
                    throw new Error('EmployeeApiService is not provided');
                }
                return this.api.getEmployee().pipe(
                    map((res) => {
                        console.log('Employee data loaded successfully', res);
                        return EmployeeActions.loadEmployeeSuccess({ employees: res });
                    }),
                    catchError((error: { message: string }) => {
                        console.log('Failed to load employee data', error.message);
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