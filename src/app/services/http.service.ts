import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as moment from "moment/moment";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) {
    }

    public getEvents(date: string, offset: number): Observable<any> {
        return this.http.get(`/Event/targetdate=${date}&offset=${offset}`);
    }

    public getAnnouncements(): Observable<any> {
        return this.http.get(`/Event/currentdate=${moment().add(new Date().getTimezoneOffset() * (-1), "minutes").toISOString()}`);
    }

}
