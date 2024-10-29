import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvestmentService } from '../../../../services/investment.service';
import { Subscription } from 'rxjs';
import { InvestmentResponse } from '../../../../models/investment-response.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Pageable } from '../../../../models/pageable.model';
import { PaginationComponent } from '../../../pagination/pagination.component';

@Component({
  selector: 'app-investment-buzzard',
  standalone: true,
  imports: [RouterLink, DatePipe, DecimalPipe, PaginationComponent],
  templateUrl: './investment-buzzard.component.html',
  styleUrl: './investment-buzzard.component.css',
})
export class InvestmentBuzzardComponent implements OnInit, OnDestroy {
  investmentsSubscription: Subscription;
  investmentPageable: Pageable<InvestmentResponse> =
    new Pageable<InvestmentResponse>();

  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private investmentService: InvestmentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.investmentsSubscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        const page = +params['page'] - 1 || 0;
        this.investmentService
          .findAll({ page, size: 5 })
          .subscribe((pageable) => {
            this.investmentPageable = pageable;
            this.currentPage = pageable.number + 1;
            this.totalPages = pageable.totalPages;
          });
      }
    );
  }

  ngOnDestroy(): void {
    this.investmentsSubscription.unsubscribe();
  }
}
