## 详细设计

    对组件实现的详细设计逻辑。

全局对象DriveEngine

DriveEngine
{
    Init({});

    Drivers;  --可订阅主题

    Maps；  --可订阅主题 

    Config(); --配置

    GetOperations（fileBaseInfo）；  --获取操作列表

    Execute(operationId,path);     

    Execute(path,isDir);  --后置实现

    Execute(fileBaseInfo); --后置实现

}

DriveEngineConfig
{
    $*.txt$:


}