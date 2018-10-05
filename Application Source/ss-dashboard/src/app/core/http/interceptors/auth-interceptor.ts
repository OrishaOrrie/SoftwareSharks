import { AuthService } from '../../auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return from(this.auth.getIdToken()) // Get the auth token from the service.
            .pipe(switchMap(authToken => {
                // Clone the request and replace the original headers with
                // cloned headers, updated with the authorization.
                const authReq = req.clone({
                    headers: req.headers
                        .set('Authorization', 'Bearer' + authToken)
                        .append('Content-Type', 'application/json')
                });
                // send Cloned request with header to the next handler.
                return next.handle(authReq);
            }))
    }
}