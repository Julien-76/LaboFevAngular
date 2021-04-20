import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor{

  constructor(private router : Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      console.log("intercepté !")
    if (!request.headers.has("Authorization")) {
      // Accès au token stocké directement dans le service

      // if (this.authService.token != undefined) {
      //   let clone = request.clone({
      //     setHeaders: {
      //       "Authorization": "Bearer " + this.authService.token
      //     }
      //   });
      //   return next.handle(clone);
      // } else {
      //   this.router.navigate(['login']).then();
      //   return next.handle(request);
      // }

      // Accès au Token stocké dans le localStorage
      
      if (localStorage.getItem('token') != null) {
        console.log("ya token")
        let clone = request.clone({
          setHeaders: {
            "Authorization": "Bearer " + localStorage.getItem('token')
          }
        });
        return next.handle(clone);
      } else {
        
        return next.handle(request);
      }
    }

    return next.handle(request);

  }
}
