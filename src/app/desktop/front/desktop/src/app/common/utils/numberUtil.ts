import { E } from "@angular/cdk/keycodes";

export function isRangesIntersection(s1:number, e1:number, s2:number, e2:number,isContainPoint = true) {
    
    // 确保两个范围都是有效的  
    if (e1 > e1 || s2 > e2) {  
        return null; // 无效范围，返回null或根据需要处理  
    }  
  
    // 计算交集  
    let intersectionStart = Math.max(s1, s2);  
    let intersectionEnd = Math.min(e1, e2);  
  
    // 检查交集是否存在  
    if(isContainPoint){
    if (intersectionStart > intersectionEnd) {  
        return false; // 没有交集  
    }  
}
else{
    if (intersectionStart >= intersectionEnd) {  
        return false; // 没有交集  
    }  
}
  
    return true; // 返回交集的范围  
  }  