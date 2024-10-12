import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvestmentService } from '../../../../services/investment.service';
import { Subscription } from 'rxjs';
import { InvestmentResponse } from '../../../../models/investment-response.model';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-investment-buzzard',
  standalone: true,
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './investment-buzzard.component.html',
  styleUrl: './investment-buzzard.component.css',
})
export class InvestmentBuzzardComponent implements OnInit, OnDestroy {
  investmentsSubscription: Subscription;
  investments: InvestmentResponse[];

  constructor(private investmentService: InvestmentService) {}

  ngOnInit(): void {
    this.investmentsSubscription = this.investmentService
      .findAll()
      .subscribe((investments) => {
        this.investments = investments;
      });
  }

  ngOnDestroy(): void {
    this.investmentsSubscription.unsubscribe();
  }
}
