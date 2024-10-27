import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../constants';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GenericHttpService } from '../generic-http.service';
import { Employee } from './employee';
@Injectable({
 providedIn: 'root',
})
export class EmployeeService  extends GenericHttpService<Employee>{
  constructor(httpClient: HttpClient) {
    super(httpClient, `employees`);
    }
  }
