export interface Employee {
    "username": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "birthDate": Date,
    "basicSalary": number,
    "status": string,
    "group": string,
    "description": string,
    "picture": {
        "large": string,
        "medium": string,
        "thumbnail": string
    }
}