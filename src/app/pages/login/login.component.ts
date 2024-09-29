import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  usuario: string = ''; // Campo de entrada para el usuario
  clave: string = ''; // Campo de entrada para la clave
  isLoading: boolean = false;
  loginFailed: boolean = false; 

  private authService = inject(AuthService); // Obtener el servicio de autenticación
  private router = inject(Router); // Obtener el servicio de navegación

  ngOnInit() {
    // Suscribirse al estado de loginFailed
    this.authService.loginFailed$.subscribe(failed => {
      this.loginFailed = failed;
    });
  }

  async login(usuario: string, clave: string) {
    this.isLoading = true; // Activar el estado de carga

    await this.authService.buscarBD4(usuario, clave); // Intentar hacer login

    this.isLoading = false; // Desactivar el estado de carga una vez que la autenticación termine

    // Usar combineLatest para obtener el estado de autenticación y el usuario completo
    combineLatest([this.authService.isAuthenticated$, this.authService.usuarioCompleto$, this.authService.loginFailed$]).subscribe(
      ([isAuthenticated, usuarioCompleto, loginFailed]) => {
        if (isAuthenticated) {
          this.usuario = ''; // Limpiar el campo de usuario
          this.clave = ''; // Limpiar el campo de clave

          if (usuarioCompleto && usuarioCompleto.tipoUsuario == 1) {
            this.router.navigate(['/inicio']); // Redirigir al usuario docente
          } else {
            this.router.navigate(['/inicio-alumno']); // Redirigir al usuario alumno
          }
        } else {
          // Aquí puedes manejar el estado de login fallido
          console.error("Login fallido. Credenciales incorrectas.");
        }
      }
    );
  }
}