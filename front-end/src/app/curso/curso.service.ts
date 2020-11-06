import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment' //verificar se aqui tem que ter virgula no final, no do fausto não tinha
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

    private apiServer = environment.apiServer

  constructor(private http: HttpClient) {}

  listar() {
      return this.http.get(this.apiServer + 'curso').toPromise()
  }
}
