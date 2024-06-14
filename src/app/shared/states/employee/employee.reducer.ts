import { createReducer, on } from "@ngrx/store"
import { Employee } from "@services/models/employee.interface"
import * as EmployeeActions from './employee.action'

export interface EmployeeState {
    employees: Employee[]
    error: string | null
}

export const initalEmployeeState: EmployeeState = {
    employees: [],
    error: null,
}

export const EmployeeReducer = createReducer(
    initalEmployeeState,
    on(EmployeeActions.loadEmployeeSuccess, (state, { employees }) => {
        return {
            ...state,
            employees,
            error: null,
        }
    }),
    on(EmployeeActions.loadEmployeeFailure, (state, { errorMessage }) => {
        return {
            ...state,
            error: errorMessage,
        }
    })
)
