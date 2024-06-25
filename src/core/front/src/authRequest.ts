import { Observable,of } from "rxjs";
import HttpClient from "./httpClient";
import { userInfoDto } from "./dto/userInfoDto";
import { jwtUtil } from "./util/jwtUtil";
import { resultDto } from "./dto/resultDto";
  
export class authRequest{
 
   private hc = new HttpClient("/api");

   public getToken(name:string,password:string) : Observable<resultDto<string>> {
       return this.hc.post<resultDto<string>>("/GetToken",{name,password});
   }

   public validateToken(token: string) : Observable<resultDto<null>> {
       return this.hc.get<resultDto<null>>("/VerifyToken",{params:{token:token}});
   }


   public login(name:string,password:string) : Observable<resultDto<string>> {
        let obs = new Observable<resultDto<string>>((observer) => {

            this.getToken(name,password).subscribe({
                next: (r) => { 
                    if(r.success && r.data != null)
                        { 
                            var token = r.data
                            localStorage.setItem("token",token); 
                        }
                        
                        observer.next(r);
                },
                error: (error) => {
                    observer.error(error);
                }, 
            })
            
        })
        return obs; 
   }

   public isLogin() : Observable<resultDto<null>> { 
        
       let token = this.getLocalToken(); 
       if (!token)
        { 
            let result = new resultDto<null>();
            result.success = false;
            result.message = "not login";
            return of(result);
        }

       return this.validateToken(token);
   }

   public getLocalToken() : string {
       return localStorage.getItem("token") || "";
   }

   public getUserInfo() :  userInfoDto {
        let userInfo = new userInfoDto();

        let token = this.getLocalToken();
        let Payload = jwtUtil.parseJWT(token);
        userInfo.name = Payload.name;

        return userInfo;
   }

}
