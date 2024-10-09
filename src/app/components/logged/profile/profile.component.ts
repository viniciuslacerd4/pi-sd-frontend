import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomValidators } from '../../../utils/custom-validators';
import { AccountService } from '../../../services/account.service';
import { AccountResponse } from '../../../models/account-response.model';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { JwtUser } from '../../../models/jwt-user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  formgroup: FormGroup;
  authSubscription: Subscription;

  get nameValid() {
    const name = this.formgroup.get('name');
    return name.invalid && (name.touched || name.dirty);
  }

  get documentValid() {
    const document = this.formgroup.get('document');
    return document.invalid && (document.touched || document.dirty);
  }

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formgroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      document: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          CustomValidators.keyedPattern(/^[0-9]*$/, 'number'),
        ],
      ],
    });

    this.authSubscription = this.authService.$jwtUser.subscribe({
      next: (jwtUser: JwtUser) => {
        this.fillForm(jwtUser);
      },
    });
  }

  onFormSubmit() {
    if (this.formgroup.invalid) return;

    this.accountService.create(this.formgroup.value).subscribe({
      next: (AccountResponse: AccountResponse) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('Error registering: ' + error);
      },
    });
  }

  private fillForm(jwtUser: JwtUser) {
    if (jwtUser?.accountId == null) return;

    this.accountService.findById(jwtUser.accountId).subscribe({
      next: (account: AccountResponse) => {
        this.formgroup.patchValue(account);
      },
    });
  }
}
