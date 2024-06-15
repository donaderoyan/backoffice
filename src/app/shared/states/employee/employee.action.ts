import { createAction, props } from "@ngrx/store"
import { Employee } from "@services/models/employee.interface";

export const loadEmployee = createAction('[Employee Component] loadEmployee')
export const loadEmployeeLoading = createAction(
    '[Employee Component] loadEmployeeLoading',
    props<{isLoading: boolean}>()
);
export const loadEmployeeSuccess = createAction(
    '[Employee Component] loadEmployeeSuccess',
    props<{employees: Employee[]}>()
);
export const loadEmployeeFailure = createAction(
    '[Employee Component] loadEmployeeFailure',
    props<{ errorMessage: string }>()
);

