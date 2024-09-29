import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.scss'],
})
export class RestablecerComponent  implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}
  
  volver() {
    this.navCtrl.navigateBack('/login', { animationDirection: 'back' });
  }
}
