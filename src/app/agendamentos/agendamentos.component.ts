import { Component, OnInit } from '@angular/core';

import {Agendamento} from './agendamento/agendamento.model'
import {AgendamentosService} from './agendamentos.service' 

@Component({
  selector: 'madv-agendamentos',
  templateUrl: './agendamentos.component.html'
})
export class AgendamentosComponent implements OnInit {

  agendamentos: Agendamento[]

  constructor(private agendamentosService: AgendamentosService) { }

  ngOnInit() {
    this.agendamentosService.agendamentos()
      .subscribe(agendamentos => this.agendamentos = agendamentos)
  }

}
