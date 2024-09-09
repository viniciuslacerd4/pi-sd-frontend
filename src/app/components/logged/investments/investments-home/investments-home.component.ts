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
  templateUrl: './investments-home.component.html',
  styleUrl: './investments-home.component.css',
})
export class InvestmentsHomeComponent {
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
