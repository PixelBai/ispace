import { auth } from "ispace.core.main"

export class Test {
    name: string
    version: string
    version2?: string
    constructor() {
        auth.login("alei","1qaz@WSX").subscribe( res => {
            console.log(res)    
        })
        this.name = "test"
        this.version = "1.0.0"
    }
}