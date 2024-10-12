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

@Component({
  selector: 'app-balance-deposit',
  standalone: true,
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './balance-deposit.component.html',
  styleUrl: './balance-deposit.component.css',
})
export class BalanceDepositComponent implements OnInit {
  balanceFormgroup: FormGroup;

  balance: number;
  depositType: string;

  constructor(private balanceService: BalanceService, private router: Router) {}

  ngOnInit(): void {
    this.balanceFormgroup = new FormGroup({
      value: new FormControl('', [Validators.required, Validators.min(0.01)]),
    });
  }

  onDepositTypeChange(type: string) {
    this.depositType = type;
  }

  onBalanceFormSubmit() {
    if (!this.balanceFormgroup.valid) return;
    this.balance = this.balanceFormgroup.get('value').value;
  }

  onSubmitOperation() {
    if (!this.depositType) return;

    this.balanceService
      .operateBalance({ operation: 'deposit', value: this.balance })
      .subscribe({
        next: () => {
          this.balanceService.updateBalance();
          this.router.navigate(['transfers']);
        },
        error: (error) => {
          console.log('Error ' + error);
        },
      });
  }
}
