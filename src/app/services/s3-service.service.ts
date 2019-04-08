import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class S3ServiceService {

  constructor(
    private http: HttpClient
  ) { 

  }

  getPresignedUrl(key) {
    return this.http.get(`https://us-central1-soundset-abffd.cloudfunctions.net/signer?key=${key}`);
  }
}
