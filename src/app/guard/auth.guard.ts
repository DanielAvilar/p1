import { CanActivateFn,Router } from '@angular/router';
import {inject} from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { map } from 'rxjs'; 

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map(isAuthenticated => {
      if(isAuthenticated){
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }

    )                                
  );
};
