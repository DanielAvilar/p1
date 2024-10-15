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

  async registrarNuevoUsuario(usuario: any) {
    const url = 'https://66f727a7b5d85f31a3422273.mockapi.io/usuario/v1';
    try {
      // Verifica si el usuario ya existe antes de registrarlo
      const usuariosExistentes = await this.obtenerUsuarios();
      const usuarioExistente = usuariosExistentes.find(u => u.usuario === usuario.user);

      if (usuarioExistente) {
        throw new Error('El usuario ya existe');
      }

      const res = await this.webservice.request('POST', url, 'usuarios', usuario);
      console.log('Usuario registrado con éxito', res);
      return res; // Devuelve la respuesta exitosa del registro
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error; // Propaga el error para manejarlo en el componente
    }
  }

  async obtenerUsuarios(): Promise<UsuarioAPI[]> {
    const url = 'https://66f727a7b5d85f31a3422273.mockapi.io/usuario/v1';
    try {
      const res = await this.webservice.request('GET', url, 'usuarios') as Array<UsuarioAPI>;
      return res; // Devuelve la lista de usuarios existentes
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error; // Manejo del error
    }
  }

}