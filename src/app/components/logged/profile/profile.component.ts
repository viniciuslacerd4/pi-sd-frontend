import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountRequest } from '../../../models/account-request.model';
import { AccountResponse } from '../../../models/account-response.model';
import { JwtUser } from '../../../models/jwt-user.model';
import { AccountService } from '../../../services/account.service';
import { AuthService } from '../../../services/auth.service';
import { CustomValidators } from '../../../utils/custom-validators';

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

  get telphoneInvalid() {
    const telephone = this.formgroup.get('telephone');
    return telephone.invalid && (telephone.touched || telephone.dirty);
  }

  get dateInvalid() {
    const dateOfBirth = this.formgroup.get('dateOfBirth');
    return dateOfBirth.invalid && (dateOfBirth.touched || dateOfBirth.dirty);
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
          Validators.minLength(11),
          CustomValidators.keyedPattern(/^[0-9]+$/, 'number'),
        ],
      ],
      telephone: [
        '',
        [
          Validators.required,
          CustomValidators.keyedPattern(/(^[0-9]+$)/, 'number'),
          Validators.minLength(11),
        ],
      ],
      dateOfBirth: ['', Validators.required],
    });

    this.authSubscription = this.authService.jwtUser$.subscribe({
      next: (jwtUser: JwtUser) => {
        this.fillForm(jwtUser);
      },
    });
  }

  onFormSubmit() {
    if (this.formgroup.invalid) return;

    const accountRequest: AccountRequest = {
      name: this.formgroup.get('name').value,
      document: this.formgroup.get('document').value,
      telephone: this.formgroup.get('telephone').value,
      dateOfBirth: this.formgroup.get('dateOfBirth').value,
    };

    this.accountService.create(accountRequest).subscribe({
      next: (accountResponse: AccountResponse) => {
        const jwtUser = this.authService.jwtUser$.value;
        jwtUser.accountId = accountResponse.id;
        this.authService.updateJwtUser(jwtUser);

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
