import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JwtUser } from '../../models/jwt-user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user: JwtUser;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.$jwtUser.subscribe((jwtUser) => {
      this.user = jwtUser;
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth', 'login']);
  }
}
