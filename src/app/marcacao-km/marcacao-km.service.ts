import { MarcacaoKm } from "./marcacao-km.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MADV_API } from "app/app.api";
import { Observable } from "rxjs";
import { reduce, tap } from "rxjs/operators";

@Injectable()
export class MarcacaoKmService {
  totalKm: number;

  constructor(private http: HttpClient) {}

  marcacoesKm(): Observable<MarcacaoKm[]> {
    return this.http.get<MarcacaoKm[]>(`${MADV_API}/marcacao-km`);
  }

  salvarKm(marcacaoKm: MarcacaoKm) {
    return this.http.post(`${MADV_API}/marcacao-km`, marcacaoKm);
  }

  removerKm(marcacaoKm: MarcacaoKm): Observable<MarcacaoKm> {
    return this.http.delete<MarcacaoKm>(
      `${MADV_API}/marcacao-km/${marcacaoKm.id}`
    );
  }

  editarKm(id: number): Observable<MarcacaoKm> {
    return this.http.get<MarcacaoKm>(`${MADV_API}/marcacao-km/${id}`);
  }

  salvarEdicaoKm(marcacaoKm: MarcacaoKm): Observable<MarcacaoKm> {
    return this.http.put<MarcacaoKm>(
      `${MADV_API}/marcacao-km/${marcacaoKm.id}`,
      marcacaoKm
    );
  }

  total(todosKm: MarcacaoKm[]): number {
    this.totalKm = todosKm.reduce((prev, value) => prev + value.distancia, 0);
    return this.totalKm;
  }
}
