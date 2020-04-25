import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import locatePt from '@angular/common/locales/pt'
import {ROUTES} from './app.routes'

registerLocaleData(locatePt, 'pt')

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TransporteComponent } from './agendamento-detalhe/transporte/transporte.component';
import { InformacoesComponent } from './agendamento-detalhe/informacoes/informacoes.component';
import { AgendamentoDetalheComponent } from './agendamento-detalhe/agendamento-detalhe.component';
import { AgendamentoComponent } from './agendamentos/agendamento/agendamento.component';
import { AgendamentosComponent } from './agendamentos/agendamentos.component';
import { ApontamentosComponent } from './apontamentos/apontamentos.component';
import { RelogioPontoComponent } from './apontamentos/relogio-ponto/relogio-ponto.component';
import { RegistroApontamentoComponent } from './apontamentos/registro-apontamento/registro-apontamento.component';
import { OcorrenciasComponent } from './ocorrencias/ocorrencias.component';
import { RegistroOcorrenciaComponent } from './ocorrencias/registro-ocorrencia/registro-ocorrencia.component';
import { ApplicationErrorHandler } from './app.error-handler';
import { SharedModule } from './shared/shared.module';
import { DespesasComponent } from './despesas/despesas.component';
import { RegistroDespesaComponent } from './despesas/registro-despesa/registro-despesa.component';
import { MarcacaoKmComponent } from './marcacao-km/marcacao-km.component';
import { RegistroMarcacaoKmComponent } from './marcacao-km/registro-marcacao-km/registro-marcacao-km.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TransporteComponent,
    InformacoesComponent,
    AgendamentoDetalheComponent,
    AgendamentoComponent,
    AgendamentosComponent,
    ApontamentosComponent,
    RelogioPontoComponent,
    RegistroApontamentoComponent,
    OcorrenciasComponent,
    RegistroOcorrenciaComponent,
    DespesasComponent,
    RegistroDespesaComponent,
    MarcacaoKmComponent,
    RegistroMarcacaoKmComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})    
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, 
              {provide: LOCALE_ID, useValue: 'pt'},
              {provide: ErrorHandler, useClass: ApplicationErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
