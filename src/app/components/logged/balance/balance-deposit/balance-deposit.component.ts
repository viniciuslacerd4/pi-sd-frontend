import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BalanceService } from '../../../../services/balance.service';
import { ToastService } from '../../../../services/toast.service';
import { TransactionService } from '../../../../services/transaction.service';

@Component({
  selector: 'app-balance-deposit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './balance-deposit.component.html',
  styleUrl: './balance-deposit.component.css',
})
export class BalanceDepositComponent implements OnInit {
  balanceFormgroup: FormGroup;
  depositType: string;

  get validDeposit() {
    return this.balanceFormgroup.valid && this.depositType;
  }

  constructor(
    private balanceService: BalanceService,
    private transactionService: TransactionService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.balanceFormgroup = new FormGroup({
      value: new FormControl('', [Validators.required, Validators.min(0.01)]),
    });
  }

  onDepositTypeChange(type: string) {
    this.depositType = type;
  }

  onSubmitOperation() {
    const balance = this.balanceFormgroup.get('value').value;

    this.transactionService
      .create({
        type: 'DEPOSIT',
        value: balance,
        description: 'Depósito via ' + this.depositType,
      })
      .subscribe({
        next: (transactionResponse) => {
          this.balanceService.updateBalance();
          this.router.navigate(['/balance', 'transfers']);
          this.toastService.addToast({
            title: 'Sucesso',
            message: 'Depósito realizado com sucesso',
            type: 'success',
          });
        },
        error: (error) => {
          console.log('Error ' + error);
          this.toastService.addToast({
            title: 'Erro',
            message: 'Erro ao realizar depósito',
            type: 'error',
          });
        },
      });
  }
}
