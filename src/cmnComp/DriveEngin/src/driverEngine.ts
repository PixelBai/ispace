
import { BehaviorSubject, Subject } from 'rxjs';  
import { DriverDto } from './dto/driverDto';
import { ruleDriverRelationDto } from './dto/ruleDriverRelationDto';
import { configOptionDto } from './dto/configOptionDto';
import { ConfigDto } from './dto/configDto';
import { modeDto } from './dto/modeDto';
import { DriverOperationDto } from './dto/driverOperationDto';

export class DriverEngine {
    
   private constructor() { 
    }

    public drivers= new BehaviorSubject<DriverDto[]>([]);

    public maps = new BehaviorSubject<ruleDriverRelationDto[]>([]);

    public modes = new BehaviorSubject<modeDto[]>([]);

    public cfg = new BehaviorSubject<ConfigDto>([]);
    
    public static init(): DriverEngine {
        return new DriverEngine();
    }

    public config(option: configOptionDto) {

        if(option.drivers)
        {
            this.drivers.next(option.drivers);
        }
        if(option.maps)
        {
            this.maps.next(option.maps);
        }
        if(option.cfg)
        {
            this.cfg.next(option.cfg);
        }    

        if(option.modes)
        {
            this.modes.next(option.modes);
        }
    }

    public getOperations(fileName: string,isDir:boolean) : DriverOperationDto[] {

        let result : DriverOperationDto[] = []; 
        this.maps.getValue().filter((map) => {
            if (map.isDir !== undefined && isDir!==map.isDir)
            {
                return false;
            }

            if(!map.rule.test(fileName))
            {
                return false;
            } 
            return true;
        })
        .map((map) => {
            return this.drivers.getValue().find((driver) => {
                return driver.id === map.driverId
            })
        })
        .filter((driver) => {
            return driver !== undefined
        })
        .map((driver) => {
            return driver.operation
        }).forEach((op) => {
            op.forEach((op) => {
                result.push(op);
            })
        });

        return result;
    }

    public execute(driverId: number,operationId: number,path: string):string{

        // step 1: get op
        let op =  this.drivers.getValue().find((driver) => {
            return driver.id === driverId
        })
        ?.operation
        .find((op) => {
            return op.id === operationId
        });

        if(op == null || op === undefined)
        {
             return "operation not found";
        }

        // step 2: get mode
        let mode = this.modes.getValue().find((mode) => {
            return mode.id === op.mode
        });
        if(mode == null || mode === undefined)
        {
            return "mode not found";
        }
        // step 3: execute
        let url = op.entry + path;
        mode.main(url);
        return "";
    }
    
} 