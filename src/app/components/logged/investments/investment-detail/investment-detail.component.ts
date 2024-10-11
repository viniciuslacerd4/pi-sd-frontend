import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InvestmentResponse } from '../../../../models/investment-response.model';
import { BalanceService } from '../../../../services/balance.service';
import { InvestmentService } from '../../../../services/investment.service';

@Component({
  selector: 'app-investment-detail',
  standalone: true,
  imports: [DecimalPipe, DatePipe],
  templateUrl: './investment-detail.component.html',
  styleUrl: './investment-detail.component.css',
})
export class InvestmentDetailComponent implements OnInit, OnDestroy {
  investment: InvestmentResponse;

  investmentSubscription: Subscription;
  sellSubscription: Subscription;

  constructor(
    private investmentService: InvestmentService,
    private activatedRoute: ActivatedRoute,
    private balanceService: BalanceService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.investmentSubscription = this.investmentService
        .findById(+params['id'])
        .subscribe((investment) => {
          this.investment = investment;
        });
    });
  }

  ngOnDestroy(): void {
    this.investmentSubscription?.unsubscribe();
    this.sellSubscription?.unsubscribe();
  }

  sell() {
    this.sellSubscription = this.investmentService
      .sell({ investmentId: this.investment.id })
      .subscribe((investment) => {
        this.investment = investment;
        this.balanceService.updateBalance();
      });
  }
}
