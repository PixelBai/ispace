import { infoUtil } from "./util/infoUtil";
import { file} from "ispace.core.main"
class Program {

    public static main(){

        console.log("start up!");

        // step 1: get url parameters
        let params = new URLSearchParams(window.location.search);
        let address = params.get("address");
        let path = params.get("path");

        // step 2: jump to address
        if (address !== null && address !== "") {
            window.location.href = address;
            return;
        }  
        if(path !== null && path !== "")
        {
            // step 1: 获取文件内容
                file.content(path).subscribe(url => {
                    console.log("uuurl:"+url);
                    // step 2: 打开超链接 
                    window.location.href = url;
                }, error => {
                    infoUtil.displayErrorInfo(error);
                })
            // step 2: 打开超链接
            return;
        }

        infoUtil.displayErrorInfo("address parameter is missing");
        console.log("end up!");
    }

}

Program.main();