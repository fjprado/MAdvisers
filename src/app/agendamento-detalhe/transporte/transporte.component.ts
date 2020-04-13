import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { AgendamentosService } from 'app/agendamentos/agendamentos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'madv-transporte',
  templateUrl: './transporte.component.html'
})
export class TransporteComponent implements OnInit {

  transporte: Observable<any>
  constructor(private agendamentoService: AgendamentosService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.transporte = this.agendamentoService.transporteDaImplantacao(this.route.parent.snapshot.params['id'])
  }

}
