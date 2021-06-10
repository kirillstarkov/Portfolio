import { isNotEmpty, maxLength, isNumber } from "./../library/validator.js";

export const formGroupConfig = {
    "firstName": [isNotEmpty, maxLength(16)],
    "lastName": [isNotEmpty, maxLength(20)],
    "age": [isNotEmpty, isNumber]
};