import { DriverOperationDto } from "./driverOperationDto";

export class DriverDto {
    public id!: number;
    public name!: string;
    public operation!: DriverOperationDto[]; 
    public fileIconUrl?:string;
}
 