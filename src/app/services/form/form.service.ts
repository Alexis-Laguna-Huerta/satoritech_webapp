import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DefaultResponse } from '../../models/http.model';

@Injectable({
    providedIn: 'root',
})
export class FormService {
    private baseUrl: string = `${environment.URL_API}/welcome-form/`;

    constructor(private http: HttpClient) { }

    async sendWelcomeForm(name: string): Promise<any> {
        try {
            const nameRequest = { name };

            const response = await firstValueFrom(
                this.http.post<DefaultResponse>(this.baseUrl + 'send-name', nameRequest)
            );

            return response;
        } catch (error) {
            return null;
        }
    }
}
