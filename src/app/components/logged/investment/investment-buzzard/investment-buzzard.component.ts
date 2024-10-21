import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvestmentService } from '../../../../services/investment.service';
import { Subscription } from 'rxjs';
import { InvestmentResponse } from '../../../../models/investment-response.model';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Pageable } from '../../../../models/pageable.model';

@Component({
  selector: 'app-investment-buzzard',
  standalone: true,
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './investment-buzzard.component.html',
  styleUrl: './investment-buzzard.component.css',
})
export class InvestmentBuzzardComponent implements OnInit, OnDestroy {
  investmentsSubscription: Subscription;
  investmentPageable: Pageable<InvestmentResponse> =
    new Pageable<InvestmentResponse>();

  constructor(private investmentService: InvestmentService) {}

  ngOnInit(): void {
    this.investmentsSubscription = this.investmentService
      .findAll()
      .subscribe((pageable) => {
        this.investmentPageable = pageable;
      });
  }

  ngOnDestroy(): void {
    this.investmentsSubscription.unsubscribe();
  }
}
