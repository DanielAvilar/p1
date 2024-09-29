import { Component, OnDestroy, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  username: string = '';
  private authService = inject(AuthService);
  private router = inject(Router);
  subscriptionAuthService: Subscription | undefined; // Inicializa como undefined

  ngOnInit() {
    this.subscriptionAuthService = this.authService.usuario$.subscribe(username => {
      this.username = username;
    });
  }

  ngOnDestroy() {
    this.subscriptionAuthService?.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}