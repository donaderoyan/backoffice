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

// Edit action
export const editEmployee = createAction(
    '[Employee Component] editEmployee',
    props<{ employee: Employee }>()
);
export const editEmployeeSuccess = createAction(
    '[Employee Component] editEmployeeSuccess',
    props<{employee: Employee}>()
);
export const editEmployeeFailure = createAction(
    '[Employee Component] editEmployeeFailure',
    props<{ errorMessage: string }>()
);