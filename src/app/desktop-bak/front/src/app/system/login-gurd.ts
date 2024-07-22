
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from "@angular/router";
import { auth } from "ispace.core.main";

export const LoginCanActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return new Promise<boolean>((resolve) => {
    auth.isLogin().subscribe({
      next: (s) => {
        if (!s.success) {
          window.location.href = "/front/src/login.html?returnUrl=" + window.location.href;
          resolve(false);
          return;
        }
        resolve(true);
      }, error: (e: any) => {
        console.log(e);
        window.location.href = "/front/src/login.html?returnUrl=" + window.location.href;
        resolve(false);
        return;
      }
    });
  });
};