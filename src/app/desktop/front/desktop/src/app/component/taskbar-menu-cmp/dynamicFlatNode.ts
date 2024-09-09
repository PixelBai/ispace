import { TaskbarMenuItemDto } from "../taskbar-menu-item-cmp/taskbar-menu-item-dto";

/** Flat node with expandable and level information */
export class DynamicFlatNode {
    constructor(
      public item: TaskbarMenuItemDto,
      public level = 0,
      public expandable = false,
      public isLoading = false,
    ) {}
  }
  