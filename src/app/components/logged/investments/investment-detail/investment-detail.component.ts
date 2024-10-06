import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvestmentService } from '../../../../services/investment.service';
import { InvestmentResponse } from '../../../../models/investment-response.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-investment-detail',
  standalone: true,
  imports: [],
  templateUrl: './investment-detail.component.html',
  styleUrl: './investment-detail.component.css',
})
export class InvestmentDetailComponent implements OnInit, OnDestroy {
  investment: InvestmentResponse;
  investmentSubscription: Subscription;

  constructor(
    private investmentService: InvestmentService,
    private activatedRoute: ActivatedRoute
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
    if (this.investmentSubscription) {
      this.investmentSubscription.unsubscribe();
    }
  }
}
