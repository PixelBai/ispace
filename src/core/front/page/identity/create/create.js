// ##添加身份js

// section init
var config = {
    // 添加身份地址
    createIdentityUrl:"/api/addIdentity",
    queryIdentityPageUrl:"/page/identity/query/query.html",
}


// section model
class Identity 
{
    name;
    code;
    desc;
}
 
// section action


// step 1： 添加身份
function createIdentity()
{
    // step 1: 获取表单数据
    var identity = new Identity();
    identity.name = $("input[name=name]").val();
    identity.desc = $("input[name=desc]").val(); 

    // step 2: 校验表单数据
    if(identity.name.length>20)
    {
        warnInfo("名称不符合规范");
        return;
    }

    // step 3： 添加数据
    $.post(config.createIdentityUrl,identity,(result)=>{ 
        // step 1: 失败处理
        if(!result.success)
        {
            tipInfo(result.msg);
            return;
        }
        // step 2: 成功
        tipInfo("添加成功");

        // step 3：清空表单数据
        $("input[name=name]").val("");
        $("input[name=desc]").val(""); 
        
        // step 4: 新页面打开身份信息
        window.open(config.queryIdentityPageUrl+"?id="+result.data.id,"_blank")

        // step end:
        return;
     },"json");
     return;
}

// common action
// step 1: 警告信息
function warnInfo(msg)
{
    // 显示错误信息
    let id = getAutoCreatedId();
    $("#alert").append('<div class="alert alert-warning alert-dismissible"> <button  id="'+id+'"  type="button" class="btn-close" data-bs-dismiss="alert"></button><strong>警告!</strong> '+msg+'</div>');
    setInterval(()=>{$("#"+id).click()},10*1000);
}

// step 2: 消息提示
function tipInfo(msg){
    // 提示信息
    let id = getAutoCreatedId();
    $("#alert").append('<div class="alert alert-info alert-dismissible"> <button id="'+id+'" type="button" class="btn-close" data-bs-dismiss="alert"></button><strong>警告!</strong> '+msg+'</div>');
    setInterval(()=>{$("#"+id).click()},10*1000);
}

// step 3: 自增ID获取
var id = 0;
function getAutoCreatedId()
{
    return ++id;
}