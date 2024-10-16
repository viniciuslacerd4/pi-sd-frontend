import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionResponse } from '../../../models/transaction-response.model';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [DecimalPipe, DatePipe],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css',
})
export class TransfersComponent implements OnInit {
  transactions: TransactionResponse[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.findAll().subscribe((transactions) => {
      this.transactions = transactions;
    });
  }
}
