export class resultDto<T> {

    constructor(){}
 
    code?: number;
    success?: boolean;
    data?: T;
    message?: string;
}
