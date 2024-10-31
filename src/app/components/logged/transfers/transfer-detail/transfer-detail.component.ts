import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TransactionResponse } from '../../../../models/transaction-response.model';

@Component({
  selector: 'app-transfer-detail',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './transfer-detail.component.html',
  styleUrl: './transfer-detail.component.css',
})
export class TransferDetailComponent {
  @Input() transaction: TransactionResponse;
}
