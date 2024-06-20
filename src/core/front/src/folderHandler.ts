import { Observable, of } from "rxjs"
import { fileInfoDto } from "./dto/fileInfoDto"
import { folderInfoDto } from "./dto/folderInfoDto"
import { fileInfoBaseDto } from "./dto/fileInfoBaseDto"

export class folderHandler {
    
    create(folderPath: string,name: string): Observable<boolean>{ 
        return  of(true)  
    }

    rename(folderPath: string,oldName: string,newName: string): Observable<boolean>{
        return  of(true)
    }

    remove(folderPath: string,name: string): Observable<boolean>{
        return  of(true)
    }

    statf(folderPath: string): Observable<folderInfoDto>{
        return  of(new folderInfoDto())
    }

    children(folderPath: string): Observable<fileInfoBaseDto[]>{
        return  of([])
    }


}