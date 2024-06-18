export interface Employee {
    "_id": string,
    "username": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "birthDate": any,
    "basicSalary": number,
    "group": string,
    "status": string,
    "description": string,
    "picture": {
        "large": string,
        "medium": string,
        "thumbnail": string
    }
}

