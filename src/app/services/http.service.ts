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
        return this.http.get(`http://localhost:5077/Event/targetdate=${date}&offset=${offset}`);
    }

    public getAnnouncements(): Observable<any> {
        return this.http.get(`http://localhost:5077/Event/currentdate=${moment().add(new Date().getTimezoneOffset() * (-1), "minutes").toISOString()}`);
    }
    public getSubImages(eventId: bigint): Observable<any> {
        return this.http.get(`http://localhost:5077/Image/event_id=${eventId}`);
    }

}
