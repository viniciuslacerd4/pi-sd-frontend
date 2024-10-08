import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { JwtUser } from '../../../models/jwt-user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formgroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formgroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onFormSubmit() {
    if (this.formgroup.invalid) return;

    this.authService
      .login(this.formgroup.value.email, this.formgroup.value.password)
      .subscribe({
        next: (jwtUser: JwtUser) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log('Error logging in: ' + error);
        },
      });
  }
}
