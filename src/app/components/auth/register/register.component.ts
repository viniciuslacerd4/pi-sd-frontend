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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  formgroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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
          //CustomValidators.matchFields('confirmPassword', true),
        ],
      ],
      confirmPassword: [
        '',
        Validators.required,
        //CustomValidators.matchFields('password', false),
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
          console.log('Error registering: ' + error);
        },
      });
  }
}
