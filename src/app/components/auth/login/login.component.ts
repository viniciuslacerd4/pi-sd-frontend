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
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formgroup: FormGroup;

  get emailInvalid() {
    const email = this.formgroup.get('email');
    return email.invalid && (email.touched || email.dirty);
  }

  get passwordInvalid() {
    const password = this.formgroup.get('password');
    return password.invalid && (password.touched || password.dirty);
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
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
          this.toastService.addToast({
            title: 'Sucesso',
            message: 'Login efetuado com sucesso!',
            type: 'success',
            timeout: 5000,
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.toastService.addToast({
            title: 'Erro',
            message: 'Email ou senha inválidos',
            type: 'error',
            timeout: 5000,
          });
        },
      });
  }
}
