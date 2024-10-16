import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BalanceService } from '../../../../services/balance.service';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { TransactionService } from '../../../../services/transaction.service';

@Component({
  selector: 'app-balance-transfer',
  standalone: true,
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './balance-transfer.component.html',
  styleUrl: './balance-transfer.component.css',
})
export class BalanceTransferComponent implements OnInit {
  balanceFormgroup: FormGroup;
  agencyFormgroup: FormGroup;
  pixFormgroup: FormGroup;

  transferType: string;
  balance: number;

  isTransferMethodSet: boolean = false;

  constructor(
    private balanceService: BalanceService,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.balanceFormgroup = new FormGroup({
      value: new FormControl('', [Validators.required, Validators.min(0.01)]),
    });

    this.agencyFormgroup = new FormGroup({
      agency: new FormControl('', Validators.required),
      account: new FormControl('', Validators.required),
      bank: new FormControl('', Validators.required),
    });

    this.pixFormgroup = new FormGroup({
      pix: new FormControl('', Validators.required),
    });
  }

  onBalanceFormSubmit() {
    if (!this.balanceFormgroup.valid) return;
    this.balance = this.balanceFormgroup.get('value').value;
  }

  onAgencyFormSubmit() {
    if (!this.balanceFormgroup.valid || !this.agencyFormgroup.valid) return;
    this.isTransferMethodSet = true;
  }

  onPixFormSubmit() {
    if (!this.balanceFormgroup.valid || !this.pixFormgroup.valid) return;
    this.isTransferMethodSet = true;
  }

  onTransferTypeChange(type: string) {
    this.isTransferMethodSet = false;
    this.agencyFormgroup.reset();
    this.pixFormgroup.reset();
    this.transferType = type;
  }

  submitOperation() {
    if (!this.isTransferMethodSet) return;

    this.transactionService
      .create({
        type: 'WITHDRAW',
        value: this.balance,
        description: 'Transferência via ' + this.transferType,
      })
      .subscribe({
        next: (transactionResponse) => {
          //this.balanceService.updateBalance(transactionResponse.value);
          this.balanceService.updateBalance();
          this.router.navigate(['transfers']);
        },
        error: (error) => {
          console.log('Error ' + error);
        },
      });
  }
}
