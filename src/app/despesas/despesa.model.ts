export class Despesa{
    constructor(public id: number, public dataDespesa: Date, public tipoDespesa: string, public valorDespesa: number){}

    getValor(): number{
        return this.valorDespesa
    }
}