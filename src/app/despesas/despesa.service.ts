import { Despesa } from './despesa.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { MADV_API } from "app/app.api";
import { Observable } from "rxjs";
import { reduce, tap } from 'rxjs/operators';

@Injectable()
export class DespesaService{

    totalDespesas: number

    constructor(private http: HttpClient){}
    
    despesas(): Observable<Despesa[]>{
        return this.http.get<Despesa[]>(`${MADV_API}/despesas`)
    }

    salvarDespesa(despesa: Despesa){
        return this.http.post(`${MADV_API}/despesas`, despesa)
    }

    removerDespesa(despesa: Despesa): Observable<Despesa>{
        return this.http.delete<Despesa>(`${MADV_API}/despesas/${despesa.id}`)
    }

    total(todasDespesas: Despesa[]): number{
        console.log(`${todasDespesas} - todas despesa - service` )
        this.totalDespesas = todasDespesas.reduce((prev, value) => prev + value.valorDespesa, 0)
        console.log(`${this.totalDespesas} - total despesas - service` )
        return this.totalDespesas
    }

}