import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeeState } from "./employee.reducer";

export const selectEmployeeFeature = createFeatureSelector<EmployeeState>('employee')

export const selectAllEmployee = createSelector(
    selectEmployeeFeature,
    (state: EmployeeState) => state.employees
)

export const selectEmployeeLoading = createSelector(
    selectEmployeeFeature,
    (state: EmployeeState) => state.isLoading
)

export const selectEmployeeError = createSelector(
    selectEmployeeFeature,
    (state: EmployeeState) => state.error
)

export const selectEmployeeById = (id: string) => createSelector(
    selectEmployeeFeature,
    (state: EmployeeState) => state.employees.find(employee => employee._id === id)
)
