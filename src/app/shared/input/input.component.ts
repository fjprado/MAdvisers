import { Component, OnInit, Input, ContentChild, AfterContentInit} from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms'

@Component({
  selector: 'madv-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label: string
  @Input() errorMessage: string
  @Input() showTip: boolean = true
  input: any  

  @ContentChild(NgModel) model: NgModel
  @ContentChild(FormControlName) control: FormControlName

  constructor() { }

  ngAfterContentInit(){
    this.input = this.model || this.control
    if(this.input === undefined){
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou FormControlName')
    }
  }

  ngOnInit() {
  }

  hasSuccess(): boolean{
    return this.input.valid && (this.input.touched || this.input.dirty || this.input.load)
  }

  hasError(){
    return this.input.invalid && (this.input.touched || this.input.dirty)
  }

}
