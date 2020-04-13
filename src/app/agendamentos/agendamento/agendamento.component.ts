import { Component, OnInit , Input} from '@angular/core';

import {Agendamento} from './agendamento.model'

@Component({
  selector: 'madv-agendamento',
  templateUrl: './agendamento.component.html'
})
export class AgendamentoComponent implements OnInit {

  @Input() agendamento: Agendamento

  constructor() { }

  ngOnInit() {
  }

}
