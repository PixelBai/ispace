import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings-dialog',
  standalone: true,
  imports: [MatExpansionModule,MatSlideToggleModule],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.sass'
})
export class SettingsDialogComponent {
  constructor(@Inject(DIALOG_DATA) public data: any) {}
 
  themeStatus = false;
  typefaceStatus = false;
  autoWrapStatus = false;

}
