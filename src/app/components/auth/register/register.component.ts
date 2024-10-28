import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../../../utils/custom-validators';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  formgroup: FormGroup;

  get emailInvalid() {
    const email = this.formgroup.get('email');
    return email.invalid && (email.touched || email.dirty);
  }

  get passwordInvalid() {
    const password = this.formgroup.get('password');
    return password.invalid && (password.touched || password.dirty);
  }

  get confirmPasswordInvalid() {
    const confirmPassword = this.formgroup.get('confirmPassword');
    return (
      confirmPassword.invalid &&
      (confirmPassword.touched || confirmPassword.dirty)
    );
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
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          CustomValidators.keyedPattern(/(?=.*[0-9])/, 'digit'),
          CustomValidators.keyedPattern(/(?=.*[a-z])/, 'lowercase'),
          CustomValidators.keyedPattern(/(?=.*[A-Z])/, 'uppercase'),
          CustomValidators.keyedPattern(/(?=.*[+-_!@#$%^&*.,?])/, 'special'),
          CustomValidators.matchFields('confirmPassword', true),
        ],
      ],
      confirmPassword: [
        '',
        Validators.required,
        CustomValidators.matchFields('password'),
      ],
    });
  }

  onFormSubmit() {
    if (this.formgroup.invalid) return;

    this.authService
      .register(this.formgroup.value.email, this.formgroup.value.password)
      .subscribe({
        next: (jwtUser) => {
          this.router.navigate(['/auth', 'login']);
        },
        error: (error) => {
          if (error.status === 406) {
            this.toastService.addToast({
              title: 'Erro',
              message: 'Email já está em uso',
              type: 'error',
              timeout: 5000,
            });
          } else {
            this.toastService.addToast({
              title: 'Erro',
              message: 'Erro ao registrar',
              type: 'error',
              timeout: 5000,
            });
            console.error('Error registering: ' + error.message);
          }
        },
      });
  }
}
