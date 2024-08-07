import { infoUtil } from "./util/infoUtil";

class Program {

    public static main(){

        console.log("start up!");

        // step 1: get url parameters
        let params = new URLSearchParams(window.location.search);
        let address = params.get("address");

        // step 2: jump to address
        if (address !== null && address !== "") {
            window.location.href = address;
        } else {
            infoUtil.displayErrorInfo("address parameter is missing");
        }
 
        console.log("end up!");
    }

}

Program.main();