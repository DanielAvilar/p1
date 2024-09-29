import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [HeaderComponent,FooterComponent],
  exports: [HeaderComponent, FooterComponent],  // make components available for other modules to import and use them
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }
