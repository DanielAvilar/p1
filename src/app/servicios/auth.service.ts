import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsuarioAPI } from '../models/UsuarioAPI.models';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private usuarioSubject = new BehaviorSubject<string>('');
  usuario$ = this.usuarioSubject.asObservable();

  private usuarioCompletoSubject = new BehaviorSubject<UsuarioAPI | null>(null);
  usuarioCompleto$ = this.usuarioCompletoSubject.asObservable();

  // Agregar un BehaviorSubject para el estado de loginFailed
  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();

  webservice = inject(WebService); // Obtener el servicio de webService

  async buscarBD4(usuario: string, clave: string) {
    const url = 'https://66f727a7b5d85f31a3422273.mockapi.io/usuario/v1';
    const res = await this.webservice.request('GET', url, 'usuarios') as Array<UsuarioAPI>;

    const user = res.find(u => u.usuario === usuario && u.pass === clave);
    if (user) {
      this.isAuthenticatedSubject.next(true);
      this.usuarioSubject.next(user.nombre);
      this.usuarioCompletoSubject.next(user);
      this.loginFailedSubject.next(false);
      return user;
    } else {
      this.isAuthenticatedSubject.next(false);
      this.loginFailedSubject.next(true);
      return null;
    }
  }

  logout(): void {
    this.usuarioSubject.next('');
    this.usuarioCompletoSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.loginFailedSubject.next(false);
  }

  isLoggedIn() {
    return this.isAuthenticated$;
  }
}