import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import { Agendamento } from './agendamento/agendamento.model'

import {MADV_API} from '../app.api'

@Injectable()
export class AgendamentosService{
    
    constructor(private http: HttpClient){}

    agendamentos(): Observable<Agendamento[]>{
        return this.http.get<Agendamento[]>(`${MADV_API}/agendamentos`)
    }
    //retorna uma lista de itens Observable de Agendamento, capturadas do Json-Server e mapeados em Json.

    agendamentosPorId(id: string): Observable<Agendamento>{
        return this.http.get<Agendamento>(`${MADV_API}/agendamentos/${id}`)
    }
    //retorna um item Observable de Agendamento através de seu ID, capturado do Json-Server e mapeado em Json.

    transporteDaImplantacao(id: string): Observable<any>{
        return this.http.get(`${MADV_API}/agendamentos/${id}/transporte`)
    }

    informacoesDaImplantacao(id: string): Observable<any>{
        return this.http.get(`${MADV_API}/agendamentos/${id}/informacoes`)
    }

}