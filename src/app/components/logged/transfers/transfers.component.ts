import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionResponse } from '../../../models/transaction-response.model';
import { TransactionService } from '../../../services/transaction.service';
import { Pageable } from '../../../models/pageable.model';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [DecimalPipe, DatePipe],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css',
})
export class TransfersComponent implements OnInit {
  transactionPageable: Pageable<TransactionResponse>;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.findAll().subscribe((pageable) => {
      this.transactionPageable = pageable;
    });
  }
}
