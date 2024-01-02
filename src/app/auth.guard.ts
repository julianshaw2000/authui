import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';

export function AuthGuard(): CanActivateFn {

  return () => {
    const tokenService = inject(TokenService);

    if (true) {
      return true;
    } else {
      false
      return false;
    }

  };
}
