import { NotFoundError, Observable, Subject, of } from 'rxjs';
import { fileInfoDto } from './dto/fileInfoDto';
import { ispaceWebSocket } from './ispaceWebSocket';
import { gv } from './core';
import { wsRequestDto, wsRequestHeaderDto } from './dto/wsRequestDto';
import { v4 as uuidv4 } from 'uuid';

export class fileHandler {

    private ws!: ispaceWebSocket;

    constructor() { 
         // step 2: build ws
         this.ws = ispaceWebSocket.getSingle();
         this.ws.connect();
    }

    create(folderPath: string, name: string): Observable<boolean> {

        let ob = new Observable<boolean>((observer) => {

            // step init:
            let handler = "file/create";

            // step 1: build request
            let req = new wsRequestDto();
            req.header = new wsRequestHeaderDto();
            req.header.handler = handler;
            req.body = {
                name,
                folderPath
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

    // TODO: implement rename
    rename(folderPath: string, oldName: string, newName: string): Observable<boolean> {
        let ob = new Observable<boolean>((observer) => {

            // step init:
            let handler = "file/rename";

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

    /**
     * Remove a file
     * @param folderPath the path where the file is located
     * @param name the name of the file to remove
     * @returns an Observable that emits a boolean indicating if the file was successfully removed
     */
    remove(folderPath: string, name: string): Observable<boolean> {
        let ob = new Observable<boolean>((observer) => {

            // step init:
            let handler = "file/remove";

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

    /**
     * Retrieves information about a file.
     * @param filePath the path of the file to retrieve information about
     * @returns an Observable that emits a fileInfoDto object containing information about the file
     */
    statf(filePath: string): Observable<fileInfoDto> {
        let ob = new Observable<fileInfoDto>((observer) => {

            // step init:
            let handler = "file/stat";

            // step 1: build request
            let req = new wsRequestDto();
            req.header = new wsRequestHeaderDto();
            req.header.handler = handler;
            req.body = {
                filePath
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

    content(filePath: string): Observable<string> {
        let ob = new Observable<string>((observer) => { 
                // 获取文件内容文本并返回

                // step init:
                let handler = "file/content"; 

                // step 1: build request
                let req = new wsRequestDto();
                req.header = new wsRequestHeaderDto();
                req.header.handler = handler;
                req.body = {
                    filePath
                };

                // step 3: send ms
                this.ws.request(req).subscribe({
                    next: (response) => {
                        if (response.header?.stat == 200) {
                            observer.next(response.body);
                        }
                        else {
                            observer.error(response);
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

    upload(filePath: string, file: File): Observable<boolean> {
        let ob = new Observable<boolean>((observer) => {    

            // step init:
            let handler = "file/upload";
            let req = new wsRequestDto();
            req.header = new wsRequestHeaderDto();
            req.header.handler = handler;
            req.body = {
                filePath,
                file
            };
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

    write(filePath: string, content: string): Observable<boolean> {
        let ob = new Observable<boolean>((observer) => {
            // step init:
            let handler = "file/write";
            let req = new wsRequestDto();
            req.header = new wsRequestHeaderDto();
            req.header.handler = handler;
            req.body = {
                filePath,
                content
            };
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

}
