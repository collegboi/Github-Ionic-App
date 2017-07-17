import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { User } from '../models/user';
import { environment } from '../environments/environment';

@Injectable()
export class GithubUsers {
  const GITHUB_API_URL = environment.githubApiUrl;
  private readonly tokenURL: string = '&access_token=96e483489990723dce4ca7f8e6c307def8196a13';

  constructor(public http: Http) { }

  // Load all github users
  load(): Observable<User[]> {
    return this.http.get(`${this.GITHUB_API_URL}/users`)
      .map(res => <User[]>res.json());
  }

   // Get github user by providing login(username)
  loadDetails(login: string): Observable<User> {
    return this.http.get(`${this.GITHUB_API_URL}/users/${login}`)
      .map(res => <User>(res.json()))
  }

  // Search for github users  
  searchUsers(searchParam: string): Observable<User[]> {
    return this.http.get(`${this.GITHUB_API_URL}/search/users?q=${searchParam}${this.tokenURL}`) 
      .map(res => <User[]>(res.json().items))
  }

}