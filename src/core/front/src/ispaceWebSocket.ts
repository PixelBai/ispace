import { Observable } from "rxjs";
import { gv } from "./core";
import { wsResponseDto } from "./dto/wsResponseDto";
import { wsRequestDto } from "./dto/wsRequestDto";
import { v4 as uuidv4 } from 'uuid';

export class ispaceWebSocket {

    static wsMap: Map<string, ispaceWebSocket> = new Map<string, ispaceWebSocket>()

    static getSingle(tag: string = "", url: string = gv.cfg.defaultWebSocketUrl): ispaceWebSocket {
        let iws = this.wsMap.get(tag)
        if (iws) {
            return iws;
        }
        iws = new ispaceWebSocket();
        iws.url = url;
        this.wsMap.set(tag, iws); 
        return iws;
    }
 
    ws?: WebSocket 
    url!: string
    onopen?: ((this: WebSocket, ev: Event) => any);
    onmessage?: ((this: WebSocket, ev: MessageEvent) => any);
    onclose?: ((this: WebSocket, ev: Event) => any);
    onerror?: ((this: WebSocket, ev: Event) => any);

    connect() {
        if ( this.ws?.readyState !== WebSocket.OPEN && this.ws?.readyState !== WebSocket.CONNECTING)
        {
            this.ws = new WebSocket(this.url);
        } 

        this.ws.onopen = this.onopen??(()=>{});

        this.ws.onmessage = this.onmessage??(()=>{});

        this.ws.onclose = this.onclose??(()=>{});

        this.ws.onerror = this.onerror??(()=>{});
    }

    request(req: wsRequestDto) : Observable<wsResponseDto>{

        let ob = new Observable<wsResponseDto>((observer) => {

        // step 1: 补充header，生成string data
        req.header.id = uuidv4();
        req.header.token = gv.token;
        let data = JSON.stringify(req);

        // step 2: send 
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(data);
        }
        else if (this.ws && this.ws.readyState === WebSocket.CONNECTING) {
            let si = setInterval(() => {
                if (this.ws && this.ws.readyState === WebSocket.OPEN) 
                    {
                    this.ws.send(data);
                    clearInterval(si);
                    }
            }, 10);
        }
        else {
            this.connect();
            let si = setInterval(() => {
                if (this.ws && this.ws.readyState === WebSocket.OPEN) 
                    {
                    this.ws.send(data);
                    clearInterval(si);
                    }
            }, 10);
        }

        // step 3: deal response
        let receive = (e:MessageEvent<any>)=>{
            try{
                let response = JSON.parse(e.data);
                if (response.header.id == req.header.id) {
                    observer.next(response); 
                    observer.complete();
                }
                }
                catch(e){
                    observer.error(e);
                }
                finally{
                    this.ws?.addEventListener('message', receive);
                }
        }
        this.ws?.addEventListener('message', receive);

    });

    return ob;

    }
 
    uploadFile(req: wsRequestDto,file: File) : Observable<wsResponseDto>{

        let ob = new Observable<wsResponseDto>((observer) => {
            // step 1: 补充header，生成string data
            req.header.id = uuidv4();
            req.header.token = gv.token;
            let data = JSON.stringify(req);
    
            // step 2: send 
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(data);
            }
            else if (this.ws && this.ws.readyState === WebSocket.CONNECTING) {
                let si = setInterval(() => {
                    if (this.ws && this.ws.readyState === WebSocket.OPEN) 
                        {
                        this.ws.send(data);
                        clearInterval(si);
                        }
                }, 10);
            }
            else {
                this.connect();
                let si = setInterval(() => {
                    if (this.ws && this.ws.readyState === WebSocket.OPEN) 
                        {
                        this.ws.send(data);
                        clearInterval(si);
                        }
                }, 10);
            }
    
            // step 3: deal response
            let receive = (e:MessageEvent<any>)=>{
                try{
                    let response = JSON.parse(e.data);
                    if (response.header.id == req.header.id) {
                        observer.next(response); 
                        observer.complete();
                    }
                    }
                    catch(e){
                        observer.error(e);
                    }
                    finally{
                        this.ws?.addEventListener('message', receive);
                    }
            }
            this.ws?.addEventListener('message', receive);
    
        });
    
        return ob; 
    }


    close() {
        if (this.ws) {
            this.ws.close();
        }
    }

}