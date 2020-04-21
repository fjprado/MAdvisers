import { Despesa } from './despesa.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { MADV_API } from "app/app.api";
import { Observable } from "rxjs";
import { reduce, tap } from 'rxjs/operators';

@Injectable()
export class DespesaService{

    constructor(private http: HttpClient){}

    todasDespesas: Despesa[]
    valorDespesas: number[]
    valorDespesa: number
    totalDespesas: number

    despesas(): Observable<Despesa[]>{
        return this.http.get<Despesa[]>(`${MADV_API}/despesas`)
    }

    salvarDespesa(despesa: Despesa){
        return this.http.post(`${MADV_API}/despesas`, despesa)
    }

    removerDespesa(despesa: Despesa): Observable<any>{
        return this.http.delete(`${MADV_API}/despesas/${despesa.id}`)
    }

    // total(): number{
    //     this.despesas().subscribe(despesas => this.todasDespesas = despesas)
    //     console.log(this.todasDespesas)
    //     this.valorDespesas = this.todasDespesas.map(despesa => this.valorDespesa = despesa.valorDespesa)
    //     console.log(this.valorDespesa)
    //     console.log(this.valorDespesas)
    //     this.totalDespesas = this.valorDespesas.reduce((prev, value) => prev + value, 0)
    //     console.log(this.totalDespesas)
    //     return this.totalDespesas
    // }

}