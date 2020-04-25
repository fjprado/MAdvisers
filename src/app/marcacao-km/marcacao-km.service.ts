import { MarcacaoKm } from './marcacao-km.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { MADV_API } from "app/app.api";
import { Observable } from "rxjs";
import { reduce, tap } from 'rxjs/operators';

@Injectable()
export class MarcacaoKmService{

    totalKm: number

    constructor(private http: HttpClient){}
    
    despesas(): Observable<MarcacaoKm[]>{
        return this.http.get<MarcacaoKm[]>(`${MADV_API}/marcacao-km`)
    }

    salvarDespesa(marcacaoKm: MarcacaoKm){
        return this.http.post(`${MADV_API}/marcacao-km`, marcacaoKm)
    }

    removerDespesa(marcacaoKm: MarcacaoKm): Observable<MarcacaoKm>{
        return this.http.delete<MarcacaoKm>(`${MADV_API}/marcacao-km/${marcacaoKm.id}`)
    }

    total(todasKm: MarcacaoKm[]): number{
        this.totalKm = todasKm.reduce((prev, value) => prev + value.getValor(), 0)
        return this.totalKm
    }

}