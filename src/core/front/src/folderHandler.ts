import { Observable, of } from "rxjs"
import { fileInfoDto } from "./dto/fileInfoDto"
import { folderInfoDto } from "./dto/folderInfoDto"
import { fileInfoBaseDto } from "./dto/fileInfoBaseDto"
import { ispaceWebSocket } from "./ispaceWebSocket";
import { wsRequestDto, wsRequestHeaderDto } from "./dto/wsRequestDto";
import { QueryDto } from "./dto/QueryDto";

export class folderHandler {
    
    ws!: ispaceWebSocket;

    constructor() { 
         // step 2: build ws
         this.ws = ispaceWebSocket.getSingle();
         this.ws.connect();
    }

    create(folderPath: string,name: string): Observable<boolean>{ 
        let ob = new Observable<boolean>((observer) => {

            // step init:
            let handler = "folder/create";

            // step 1: build request
            let req = new wsRequestDto();
            req.header = new wsRequestHeaderDto();
            req.header.handler = handler;
            req.body = {
                folderPath,
                name
            }; 

            // step 3: send ms
            this.ws.request(req).subscribe({
                next: (response) => {
                    if (response.header?.stat == 200) {
                        observer.next(true);
                    }
                    else {
                        observer.error(response.body);
                    }
                    observer.complete();
                },
                error: (error) => {
                    observer.error(error);
                    observer.complete();
                }
            });
        });

        return ob;
    }

    rename(folderPath: string,oldName: string,newName: string): Observable<boolean>{
        let ob = new Observable<boolean>((observer) => {

            // step init:
            let handler = "folder/rename";

            // step 1: build request
            let req = new wsRequestDto();
            req.header = new wsRequestHeaderDto();
            req.header.handler = handler;
            req.body = {
                folderPath,
                oldName,
                newName
            }; 

            // step 3: send ms
            this.ws.request(req).subscribe({
                next: (response) => {
                    if (response.header?.stat == 200) {
                        observer.next(true);
                    }
                    else {
                        observer.error(response.body);
                    }
                    observer.complete();
                },
                error: (error) => {
                    observer.error(error);
                    observer.complete();
                }
            });
        });

        return ob;
    }

    remove(folderPath: string,name: string): Observable<boolean>{
        let ob = new Observable<boolean>((observer) => {

            // step init:
            let handler = "folder/remove";

            // step 1: build request
            let req = new wsRequestDto();
            req.header = new wsRequestHeaderDto();
            req.header.handler = handler;
            req.body = {
                folderPath,
                name
            }; 

            // step 3: send ms
            this.ws.request(req).subscribe({
                next: (response) => {
                    if (response.header?.stat == 200) {
                        observer.next(true);
                    }
                    else {
                        observer.error(response.body);
                    }
                    observer.complete();
                },
                error: (error) => {
                    observer.error(error);
                    observer.complete();
                }
            });
        });

        return ob;
    }

    statf(folderPath: string): Observable<folderInfoDto>{
        let ob = new Observable<folderInfoDto>((observer) => {

            // step init:
            let handler = "folder/stat";

            // step 1: build request
            let req = new wsRequestDto();
            req.header = new wsRequestHeaderDto();
            req.header.handler = handler;
            req.body = {
                folderPath
            }; 

            // step 3: send ms
            this.ws.request(req).subscribe({
                next: (response) => {
                    if (response.header?.stat == 200) {
                        observer.next(response.body);
                    }
                    else {
                        observer.error(response.body);
                    }
                    observer.complete();
                },
                error: (error) => {
                    observer.error(error);
                    observer.complete();
                }
            });
        });

        return ob;
    }

    children(query:QueryDto): Observable<fileInfoBaseDto[]>{
        let ob = new Observable<fileInfoBaseDto[]>((observer) => {

            // step init:
            let handler = "folder/children";

            // step 1: build request
            let req = new wsRequestDto();
            req.header = new wsRequestHeaderDto();
            req.header.handler = handler;
            req.body = query; 

            // step 3: send ms
            this.ws.request(req).subscribe({
                next: (response) => {
                    if (response.header?.stat == 200) {
                        observer.next(response.body);
                    }
                    else {
                        observer.error(response.body);
                    }
                    observer.complete();
                },
                error: (error) => {
                    observer.error(error);
                    observer.complete();
                }
            });
        });

        return ob;
    }
    
}
