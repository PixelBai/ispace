import { Observable, Subject, of } from 'rxjs';
import { fileInfoDto } from './dto/fileInfoDto';
import { ispaceWebSocket } from './ispaceWebSocket';
import { gv } from './core';
import { wsRequestDto, wsRequestHeaderDto } from './dto/wsRequestDto';
import { v4 as uuidv4 } from 'uuid';

export class fileHandler {

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
            // step 2: build ws
            let ws = ispaceWebSocket.getSingle();

            // step 3: send ms
            ws.request(req).subscribe({
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

    rename(folderPath: string, oldName: string, newName: string): Observable<boolean> {
        return of(true)
    }

    remove(folderPath: string, name: string): Observable<boolean> {
        return of(true)
    }

    statf(filePath: string): Observable<fileInfoDto> {
        return of(new fileInfoDto())
    }

}
