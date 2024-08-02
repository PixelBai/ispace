import { ConfigDto } from "./configDto";
import { DriverDto } from "./driverDto";
import { modeDto } from "./modeDto";
import { ruleDriverRelationDto } from "./ruleDriverRelationDto";

export class configOptionDto  {

    public drivers?:DriverDto[];

    public maps?:ruleDriverRelationDto[];

    public modes?:modeDto[];

    public cfg?:ConfigDto;
}