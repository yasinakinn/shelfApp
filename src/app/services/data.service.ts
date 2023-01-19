import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class DataService {
  baseURL = 'http://localhost:8000/';
  constructor() { }

  fetchRequest(url: string, method: string, body: any): Observable<any> {
    const subject = new Subject<any>();
    const headers = new Headers();

    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const options = new Request(this.baseURL + url, {
      method: method,
      headers: headers,
      body: new URLSearchParams(body)
    });
    fetch(options)
      .then(response => response.json())
      .then(data => {
        subject.next(data);
      })
      .catch(error => {
        subject.error(error);
      });
    return subject.asObservable();
  }

  post(url: string, body: any): Observable<any> {
    const subject = new Subject<any>();
    this.fetchRequest(url, 'POST', body).subscribe(data => {
      subject.next(data);
    }
      , error => {
        subject.error(error);
      }
    );
    return subject.asObservable();
  }

  get(url: string, method: string): Observable<any> {
    const subject = new Subject<any>();
    const headers = new Headers();

    headers.append("Content-Type", "application/x-www-form-urlencoded");
    const options = new Request( url, {
      method: method,
      headers: headers,
    });
    fetch(options)
      .then(response => response.json())
      .then(data => {
        subject.next(data);
      })
      .catch(error => {
        subject.error(error);
      });
    return subject.asObservable();
  }
}
