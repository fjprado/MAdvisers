import {Routes} from '@angular/router'
//Components
import {HomeComponent} from './home/home.component'
import { AgendamentosComponent } from './agendamentos/agendamentos.component'
import { AgendamentoDetalheComponent } from './agendamento-detalhe/agendamento-detalhe.component'
import { TransporteComponent } from './agendamento-detalhe/transporte/transporte.component'
import { InformacoesComponent } from './agendamento-detalhe/informacoes/informacoes.component'
import { ApontamentosComponent } from './apontamentos/apontamentos.component'
import { OcorrenciasComponent } from './ocorrencias/ocorrencias.component'

export const ROUTES : Routes = [
    {path: '', component: HomeComponent},
    {path: 'sobre', loadChildren: './sobre/sobre.module#SobreModule'},
    {path: 'apontamentos', component: ApontamentosComponent},
    {path: 'ocorrencias', component: OcorrenciasComponent},
    {path: 'agendamentos', component: AgendamentosComponent},
    {path: 'agendamentos/:id', component: AgendamentoDetalheComponent,
        children: [
            {path: '', redirectTo: 'informacoes', pathMatch: 'full'},
            {path: 'informacoes', component: InformacoesComponent},
            {path: 'transporte', component: TransporteComponent}
        ]
    }
]