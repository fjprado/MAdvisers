import { MarcacaoKmService } from './../marcacao-km/marcacao-km.service';
import { DespesaService } from './../despesas/despesa.service';
import { OcorrenciaService } from './../ocorrencias/ocorrencia.service';
import { ApontamentosService } from './../apontamentos/apontamentos.service';
import { AgendamentosService } from 'app/agendamentos/agendamentos.service';
import { NgModule, ModuleWithProviders } from '@angular/core'
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notification.service';
import { LoginService } from 'app/security/login/login.service';
import { LoggedInGuard } from 'app/security/loggedin.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInteceptor } from 'app/security/auth.inteceptor';

@NgModule({
    declarations: [InputComponent, RadioComponent, SnackbarComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, RadioComponent, SnackbarComponent,
                CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule{
    static forRoot(): ModuleWithProviders{
        return {
            ngModule: SharedModule,
            providers: [AgendamentosService,
                        ApontamentosService,
                        OcorrenciaService, 
                        NotificationService,
                        DespesaService, 
                        MarcacaoKmService,
                        LoginService,
                        LoggedInGuard,
                        {provide: HTTP_INTERCEPTORS, useClass: AuthInteceptor, multi: true}
                    ]
        }
    }
}