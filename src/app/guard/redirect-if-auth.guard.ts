import { CanActivateFn,Router } from '@angular/router';
import {inject} from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { map } from 'rxjs'; 

export const redirectIfAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
})
)
};
