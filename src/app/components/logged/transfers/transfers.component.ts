import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionResponse } from '../../../models/transaction-response.model';
import { TransactionService } from '../../../services/transaction.service';
import { Pageable } from '../../../models/pageable.model';
import { TransferDetailComponent } from './transfer-detail/transfer-detail.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [DecimalPipe, DatePipe, TransferDetailComponent],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css',
})
export class TransfersComponent implements OnInit, OnDestroy {
  transactionPageable: Pageable<TransactionResponse>;
  selectedTransaction: TransactionResponse;

  subscription: Subscription;
  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.subscription = this.transactionService
      .findAll()
      .subscribe((pageable) => {
        this.transactionPageable = pageable;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.onCloseTransaction();
  }

  onSelectTransaction(transaction: TransactionResponse) {
    this.selectedTransaction = transaction;
  }
  onCloseTransaction() {
    this.selectedTransaction = null;
  }
}
