import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Model } from '../../shared/models/model';
import { environment } from '../../../environments/environment';
import { ConfirmationResponse } from '../../shared/models/responses/confirmation-response';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class BackendService {
  private apiURI = environment.apiURI;
  private trainReqPath = 'trainModel';
  private predictReqPath = 'predict';

  constructor(
    private http: HttpClient
  ) { }

  sendTrainRequest(model: Model) {
    const url = this.apiURI + this.trainReqPath;

    const data = JSON.stringify(model);
    console.log(data);

    return this.http.post<ConfirmationResponse>(url, data)
      .pipe(
        retry(3), // Retry request 3 times if failed
        catchError(this.handleError) // Else handle error and continue
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
