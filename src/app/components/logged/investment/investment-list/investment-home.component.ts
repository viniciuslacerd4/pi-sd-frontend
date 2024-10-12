import { Component } from '@angular/core';

interface InvestmentType {
  name: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-investments-home',
  standalone: true,
  imports: [],
  templateUrl: './investment-home.component.html',
  styleUrl: './investment-home.component.css',
})
export class InvestmentListComponent {
  investmentTypes: InvestmentType[] = [
    {
      name: 'Pix Buzzard',
      description: 'A maneira mais rápida de investir com retorno garantido',
      icon: 'fa-solid fa-feather-pointed',
    },
    {
      name: 'Poupança',
      description:
        'Conhecida por todo brasileiro, com rendimentos maiores aqui',
      icon: 'fa-solid fa-piggy-bank',
    },
    {
      name: 'Tesouro direto',
      description: 'Opção simples, segura e com taxa zero para investir',
      icon: 'fa-solid fa-dollar-sign',
    },
  ];
}
