import {Injectable} from '@angular/core'

import { RegistroApontamento } from './registro-apontamento/registro-apontamento.model'
import { Apontamento } from './relogio-ponto/apontamento.model'
import {MADV_API} from '../app.api'

@Injectable()
export class ApontamentosService{

    constructor(){}
    
    apontamentos: RegistroApontamento[] = []

    addApontamento(apontamento: Apontamento){
        this.apontamentos.push(new RegistroApontamento(apontamento))
    }
    
    totalDeHoras(): string{
        let totalApontamentos: number = 0
        let verificadorInicio: boolean = true
        let horaApontada: number

        function somarHoras(item){
            console.log(item.getHoraTime())
            if(verificadorInicio){
                horaApontada = item.getHoraTime()
                verificadorInicio = false
            }else{
                totalApontamentos = totalApontamentos + (item.getHoraTime() - horaApontada)
                verificadorInicio = true
            }
        }

        this.apontamentos.forEach(somarHoras)

        let totalHoras = Math.trunc(totalApontamentos/60)
        let totalMinutos = totalApontamentos%60

        return `${totalHoras}:${totalMinutos}`
    }
/*
    registrosDeApontamento(id: string): Observable<Apontamento[]>{
        return this.http.get(`${MADV_API}/apontamentos/${id}/registro-apontamento`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError)
    } */
}