import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface SidebarItem {
  icon: string;
  label: string;
  route: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  sidebarItems: SidebarItem[] = [
    {
      icon: 'fa-solid fa-money-bill-trend-up',
      label: 'Investimentos',
      route: ['/investments'],
    },
    { icon: 'fa-solid fa-wallet', label: 'Carteira', route: ['/wallet'] },
    {
      icon: 'fa-solid fa-money-bill-transfer',
      label: 'Transferências',
      route: ['/transfers'],
    },
  ];
}
