
import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZipcodeTrendViewModel } from '../../models/zipCodeTrendViewModel';
import { PoliciesViewModel } from '../../models/policiesViewModel';

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
            .get<ZipcodeTrendViewModel>(`http://localhost:3000/insuranceByZipCode`)
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


