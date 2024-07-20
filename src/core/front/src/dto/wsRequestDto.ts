
export class wsRequestDto{

    constructor(){
        this.header = new wsRequestHeaderDto();
    }

    header!:wsRequestHeaderDto;
    body?:any;

}

export class wsRequestHeaderDto{
    id!:string;
    handler!:string; 
    token!:string; 
}