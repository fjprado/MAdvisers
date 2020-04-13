import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router';
import { ApontamentosService } from './apontamentos.service';
import { RegistroApontamento } from './registro-apontamento/registro-apontamento.model'

@Component({
  selector: 'madv-apontamentos',
  templateUrl: './apontamentos.component.html'
})
export class ApontamentosComponent implements OnInit {

  constructor(private apontamentosService: ApontamentosService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
