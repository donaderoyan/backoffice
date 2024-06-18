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
    }),


    // Best practice setiap edit pakai api (ini hanya simulation edit)
    on(EmployeeActions.editEmployee, (state, { employee }) => {
        const updatedEmployees = [...state.employees];
        const foundIndex = state.employees.findIndex((emp) => emp._id === employee._id);
        if (foundIndex !== -1) {
            updatedEmployees[foundIndex] = { ...updatedEmployees[foundIndex], ...employee };
        } else {
            updatedEmployees.push(employee);
        }
        return {
            ...state,
            employees: updatedEmployees,
            error: null,
        }
    }),
)
