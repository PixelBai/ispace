// section init
var config = {
    // 添加身份地址
    queryIdentityUrl:"/api/getIdentity",
}

// section model
class Identity 
{
    name;
    code;
    desc;
}
//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
} 
function init(){

    // step 1: 获取身份Id
    var id = getUrlParam("id");

    // step 2: 获取身份信息
        // step 3： 添加数据
   $.get(config.queryIdentityUrl+"?id="+id,(result)=>{ 
            // step 1: 失败处理
            if(!result.success)
            {
                tipInfo(result.msg);
                return;
            }  
    
            // step 3：表单数据
            $("#id").html(result.data.id); 
            $("#code").html(result.data.code); 
            $("#name").html(result.data.name); 
            $("#desc").html(result.data.desc); 
            
            // step end:
            return;
    },"json");

    // step 3： 

}
init();