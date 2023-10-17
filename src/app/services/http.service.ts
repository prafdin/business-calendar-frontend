import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) {
    }

    public getEvents(date: string, offset: number): Observable<any> {
        return this.http.get(`http://localhost:5077/Event/targetdate=${date}&offset=${offset}`);
    }
}
