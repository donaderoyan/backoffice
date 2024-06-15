import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map } from 'rxjs';
import { Employee } from "@services/models/employee.interface";

@Injectable({
    providedIn: 'root'
})
export class EmployeeApiService {
    http = inject(HttpClient)
    constructor() {}

    // untuk dummy data saya menggunakna https://randomuser.me/documentation#howto
    getEmployee() {
        return this.http.get<Employee[]>('https://randomuser.me/api/?results=100')
        .pipe(
            map(((response: any) => {
                return response.results.map((employee: any) => {
                    const transformedEmployee: Employee = {
                        username: employee["login"] ? employee["login"]["username"] : '',
                        firstName: employee.name.first,
                        lastName: employee.name.last,
                        email: employee.email,
                        birthDate: employee.dob.date,
                        basicSalary: Math.round((Math.random() * (15 - 5) + 5) * 1000000), // untuk Rp (random decimal number antara 5 - 15) x 1000.0000 
                        status: Math.round(Math.random()) ? 'active' : 'inactive', // random 0 atau 1 
                        group: employee.id.name ? employee.id.name : '-',
                        description: `Employee registration date: ${new Date(employee.registered.date).toLocaleDateString('en-GB')}`,
                        picture: {
                            large: employee.picture.large,
                            medium: employee.picture.medium,
                            thumbnail: employee.picture.thumbnail
                        }
                    }
                    return transformedEmployee;
                })
                
            }))
        )
    }
}