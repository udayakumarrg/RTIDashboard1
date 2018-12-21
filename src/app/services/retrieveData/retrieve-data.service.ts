
import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZipcodeTrendViewModel } from '../../models/zipCodeTrendViewModel';
import { PoliciesViewModel } from '../../models/policiesViewModel';
import { WeatherViewModel } from '../../models/weatherView.model';
import { Observable } from 'rxjs';

@Injectable()
export class RetrieveDataService {
    data: Object;
    loading: boolean;

    constructor(public http: HttpClient) { }


    getPolicies(policyNumber: number): Promise<PoliciesViewModel> {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise((resolve, reject) => {
            this.http
            .get<PoliciesViewModel>(`http://localhost:3000/insurancePolicyList`)
            .toPromise().then(response => {
                if (response) {
                    resolve(response);
                }
            })
                .catch((error) => {
                    reject(error);
                });
            });
        }

    getTrendByZipCode(zipCode: string): Promise<ZipcodeTrendViewModel> {
        // tslint:disable-next-line:no-shadowed-variable
        return new Promise((resolve, reject) => {
            this.http
            .get<ZipcodeTrendViewModel>(`http://localhost:3000/insuranceTrendByZipcode`)
            .toPromise().then(response => {
                if (response) {
                    resolve(response);
                }
            })
                .catch((error) => {
                    reject(error);
                });
            });
        }

        getWeather(state: string): Promise<WeatherViewModel> {
            // tslint:disable-next-line:no-shadowed-variable
            return new Promise((resolve, reject) => {
                const currentDate = new Date();
                const twoYearsAgo = currentDate.getFullYear() -2;
                currentDate.setFullYear(twoYearsAgo);
                let day = String(currentDate.getDay());
                day = ("0" + day).slice(-2);
                let month = String(currentDate.getMonth());
                month = ("0" + month).slice(-2);
                this.http
                // tslint:disable-next-line:max-line-length
                .get<WeatherViewModel>(`https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$filter=declarationDate%20ge%20%27${twoYearsAgo}-${month}-${day}T04:00:00.000z%27%20and%20state%20eq%20%27${state}%27`)
                .toPromise().then(response => {
                    if (response) {
                        resolve(response);
                    }
                })
                    .catch((error) => {
                        reject(error);
                    });
                });
        }
}



