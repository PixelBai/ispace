import { Observable,of } from "rxjs";
import HttpClient from "./httpClient"; 
import { resultDto } from "./dto/resultDto";
  
export class commonRequest{
 
   private hc = new HttpClient("/api");

   public getDateTime() : Observable<resultDto<Date>> {
        return this.hc.get<resultDto<Date>>("/Datetime");
   } 

}
