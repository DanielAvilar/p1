import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import QRious from 'qrious';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-qrlista',
  templateUrl: './qrlista.component.html',
  styleUrls: ['./qrlista.component.scss'],
})
export class QrlistaComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  usuario: string = '';
  subscriptionAuthService: Subscription | null = null; 
  qrData: string = ''; // Almacena los datos del QR
  showQRCode: boolean = false; // Controla la visibilidad del código QR

  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>; // Referencia al canvas

  generarQR(asignaturaId: string) { // Generar la QR
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const día = String(fechaActual.getDate()).padStart(2, '0');
    const horas = String(fechaActual.getHours()).padStart(2, '0');
    const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaActual.getSeconds()).padStart(2, '0');

    const fechaHora = `${año}-${mes}-${día},${horas}:${minutos}:${segundos}`;
    this.qrData = `http://localhost:8100/asistencia/${asignaturaId}/${this.usuario}/${fechaHora}`;

    this.showQRCode = true; // Muestra el código QR
    this.createQR(); // Genera el código QR
  }

  createQR() {
    const qr = new QRious({
      element: this.qrCanvas.nativeElement,
      value: this.qrData,
      size: 256, // Tamaño del QR
      level: 'M' // Nivel de corrección de errores
    });
  }

  ngOnInit() {
    this.subscriptionAuthService = this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
      console.log('Docente:', usuario);
      if (usuario) {
        this.generarQR('asignaturaIdEjemplo'); // Cambia esto según tu lógica
      }
    });
  }

  ngOnDestroy() {
    if (this.subscriptionAuthService) {
      this.subscriptionAuthService.unsubscribe();
    }
  }
}