import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() pageParams: { currentPage: number; totalPages: number } = {
    currentPage: 1,
    totalPages: 1,
  };

  get pageNumbers(): number[] {
    const { currentPage, totalPages } = this.pageParams;
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }
}
