import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

interface TransferItem{
  timeStamp: string;
  amount: number;
  operation: string;
  type: string;
  balance: number;
}

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css',
})
export class TransfersComponent {
  transfers: TransferItem[] = [
    {
      timeStamp: '2021-10-10T10:10:10',
      amount: 100,
      operation: 'Depósito',
      type: 'Crédito',
      balance: 100,
    },
    {
      timeStamp: '2021-10-10T10:10:10',
      amount: 100,
      operation: 'Depósito',
      type: 'Crédito',
      balance: 200,
    },
    {
      timeStamp: '2021-10-10T10:10:10',
      amount: 100,
      operation: 'Saque',
      type: 'Débito',
      balance: 200,
    },
    {
      timeStamp: '2021-10-10T10:10:10',
      amount: 100,
      operation: 'Saque',
      type: 'Débito',
      balance: 100,
    },
    {
      timeStamp: '2021-10-10T10:10:10',
      amount: 400,
      operation: 'Depósito',
      type: 'Crédito',
      balance: 500,
    },
  ];
}
