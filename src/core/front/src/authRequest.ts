import { Observable } from "rxjs";
import HttpClient from "./httpClient";
  
export class authRequest{
 
   private hc = new HttpClient("/api");

   getToken(name:string,password:string) : Observable<string> {
       return this.hc.post<string>("/GetToken",{name,password});
   }

   validateToken(token: string) : Observable<boolean> {
       return this.hc.get<boolean>("/VerifyToken",{params:{token:token}});
   }

}
