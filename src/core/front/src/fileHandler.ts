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
            req.header.id = uuidv4();
            req.header.token = gv.token;
            req.header.handler = handler;
            req.body = {
                name,
                folderPath
            };
            // step 2: send ms
            let ws = ispaceWebSocket.getSingle();
            debugger
            ws.onmessage = (e) => {
                let a = e.data;
                let response = JSON.parse(e.data);
                if (response.header.id == req.header.id) {
                    if (response.header.stat == 200) {
                        observer.next(true);
                    }
                    else {
                        observer.error(response.body);
                    }
                    observer.complete();
                }
                observer.next();
            }
            ws.connect(gv.cfg.defaultWebSocketUrl);

            if (ws.ws?.OPEN)
                ws.send(JSON.stringify(req));
            else
                {
                    let si = setInterval(() => {
                    if (ws.ws?.OPEN)
                        ws.send(JSON.stringify(req));
                        clearInterval(si);
                }, 10);
            }
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
