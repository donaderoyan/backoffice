import { createReducer, on } from "@ngrx/store"
import { Employee } from "@services/models/employee.interface"
import * as EmployeeActions from './employee.action'

export interface EmployeeState {
    employees: Employee[],
    isLoading: boolean,
    error: string | null
}

export const initalEmployeeState: EmployeeState = {
    employees: [],
    isLoading: true,
    error: null,
}

export const EmployeeReducer = createReducer(
    initalEmployeeState,
    on(EmployeeActions.loadEmployeeLoading, (state, { isLoading }) => {
        return {
            ...state,
            isLoading,
            error: null,
        }
    }),
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
