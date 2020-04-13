import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { MADV_API } from "app/app.api";
import { OcorrenciaDetalhe } from './ocorrencia-detalhe.model'
import { Observable } from "rxjs";
import { Agendamento } from "app/agendamentos/agendamento/agendamento.model";

@Injectable()
export class OcorrenciaService{

    constructor(private http: HttpClient){}

    ocorrencias(): Observable<any>{
        return this.http.get(`${MADV_API}/ocorrencias`)
    }

    editarRascunho(id: string): Observable<OcorrenciaDetalhe>{
        return this.http.get<OcorrenciaDetalhe>(`${MADV_API}/ocorrencias/${id}`)
    }

    salvarRascunho(ocorrencia: OcorrenciaDetalhe){
        return this.http.post(`${MADV_API}/ocorrencias`, ocorrencia)
    }

    salvarEdicao(ocorrencia: OcorrenciaDetalhe): Observable<OcorrenciaDetalhe>{
        console.log(ocorrencia)
        return this.http.put<OcorrenciaDetalhe>(`${MADV_API}/ocorrencias/${ocorrencia.id}`, ocorrencia)
    }

    removerRascunho(ocorrencia: OcorrenciaDetalhe): Observable<any>{
        return this.http.delete(`${MADV_API}/ocorrencias/${ocorrencia.id}`)
    }
}