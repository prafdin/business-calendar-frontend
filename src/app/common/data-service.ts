import { Injectable } from '@angular/core';

@Injectable({providedIn:"root"})
export class DataService {

    private data:any = {};

    setValue(key:string, value:any) {
        this.data[key] = value;
    }

    getValue(key:string) {
        return this.data[key];
    }
}