export class ispaceWebSocket {

    static wsMap: Map<string, ispaceWebSocket> = new Map<string, ispaceWebSocket>()

    static getSingle(tag: string = "") {
        let iws = this.wsMap.get(tag)
        if (iws) {
            return iws;
        }
        iws = new ispaceWebSocket();
        this.wsMap.set(tag, iws);
        return iws;
    }
 
    ws?: WebSocket 
    onopen?: ((this: WebSocket, ev: Event) => any);
    onmessage?: ((this: WebSocket, ev: MessageEvent) => any);
    onclose?: ((this: WebSocket, ev: Event) => any);
    onerror?: ((this: WebSocket, ev: Event) => any);

    connect(url: string) {
        if ( this.ws?.readyState !== WebSocket.OPEN)
        {
            this.ws = new WebSocket(url);
        } 

        this.ws.onopen = this.onopen??(()=>{});

        this.ws.onmessage = this.onmessage??(()=>{});

        this.ws.onclose = this.onclose??(()=>{});

        this.ws.onerror = this.onerror??(()=>{});
    }

    send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(data);
        } else {
            console.error("WebSocket is not open");
        }
    }

    close() {
        if (this.ws) {
            this.ws.close();
        }
    }

}