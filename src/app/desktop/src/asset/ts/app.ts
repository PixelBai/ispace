import { Test } from "./test"
import {auth} from "ispace.core.main"

let info = new Test()

export let tool  = {
    name: "app", 
    version: "1.0.0",
    info
}

export let init = () => {
    auth.login("alei","1qaz@WSX").subscribe( res => {
        console.log(res)    
    })
    console.log("app init")

}