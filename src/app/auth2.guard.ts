import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const auth2Guard: CanActivateFn = (route, state) => {
  const _Router = inject(Router)
  if (localStorage.getItem('_token') == null) {
  return true;
    
  }else{
    _Router.navigate(['/home'])
  return false;
  }
};
