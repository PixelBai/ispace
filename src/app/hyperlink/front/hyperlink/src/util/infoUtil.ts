export class infoUtil{

    public static displayErrorInfo(message:string)
    {
        // step init: 获取bod节点
        let root =  document.getElementsByTagName("body")[0];
 
        // step 1： clean error_info elem
        let errorInfoElem = document.getElementById("error_info");
        if(errorInfoElem)
        {
            root.removeChild(errorInfoElem);
        }

        // step 2: create new error_info elem
        errorInfoElem = document.createElement("p");
        errorInfoElem.id = "error_info";
        errorInfoElem.style.color = "red";
        errorInfoElem.innerHTML = message;

        // step 3: append error_info elem to root
        root.appendChild(errorInfoElem); 
    }

}