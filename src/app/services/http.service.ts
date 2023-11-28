import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as moment from "moment/moment";
import { BACKEND_SERVER_URL } from "../common/constants";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) {
    }

    public getEvents(date: string, offset: number): Observable<any> {
        return this.http.get(BACKEND_SERVER_URL + `/Event/targetdate=${date}&offset=${offset}`);
    }

    public getAnnouncements(): Observable<any> {
        return this.http.get(BACKEND_SERVER_URL + `/Event/currentdate=${moment().add(new Date().getTimezoneOffset() * (-1), "minutes").toISOString()}`);
    }

    public getSubImages(eventId: bigint): Observable<any> {
        return this.http.get(BACKEND_SERVER_URL + `/Image/event_id=${eventId}`);
    }

    public registerToEvent(userData: { firstName: string, lastName: string, emailAddress: string, phoneNumber: string }, eventId: string): Observable<any> {
        return this.http.post(BACKEND_SERVER_URL + `/EventSignUp`, {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.emailAddress,
            phoneNumber: userData.phoneNumber,
            event_Id: eventId
        });
    }
}
