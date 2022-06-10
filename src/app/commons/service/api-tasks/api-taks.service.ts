import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../../model/Task';

@Injectable({
  providedIn: 'root'
})
export class ApiTaksService {

  public context: string = `${environment.api}/tasks`;

  constructor(private http: HttpClient) { }

  getList(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.context);
  }

  create(object: ITask): Observable<any> {
    return this.http.post<any>(this.context, object);
  } 

  update(object: ITask): Observable<any> {
    return this.http.put<any>(this.context, object);
  }

  delete(id:number): Observable<any> {
    return this.http.delete<any>(`${this.context}/${id}`);
  }
}