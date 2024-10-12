import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BalanceService } from '../../../../services/balance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balance-transfer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './balance-transfer.component.html',
  styleUrl: './balance-transfer.component.css',
})
export class BalanceTransferComponent implements OnInit {
  balanceFormgroup: FormGroup;
  agencyFormgroup: FormGroup;
  pixFormgroup: FormGroup;

  transferType: string;
  balance: number;

  constructor(private balanceService: BalanceService, private router: Router) {}

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

    this.submitOperation();
  }

  onPixFormSubmit() {
    if (!this.balanceFormgroup.valid || !this.pixFormgroup.valid) return;

    this.submitOperation();
  }

  onTransferTypeChange(type: string) {
    this.transferType = type;
  }

  private submitOperation() {
    this.balanceService
      .operateBalance({ operation: 'withdraw', value: this.balance })
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
