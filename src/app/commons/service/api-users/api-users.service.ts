import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  public context: string = `${environment.api}/users`;

  constructor(private http: HttpClient) { }

  getList(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.context);
  }

  get(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.context}/${id}`);
  }

  create(object: IUser): Observable<any> {
    return this.http.post<any>(this.context, object);
  } 
}
