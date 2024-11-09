import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountRequest } from '../../../models/account-request.model';
import { AccountResponse } from '../../../models/account-response.model';
import { JwtUser } from '../../../models/jwt-user.model';
import { AccountService } from '../../../services/account.service';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import { CustomValidators } from '../../../utils/custom-validators';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  formgroup: FormGroup;
  authSubscription: Subscription;
  accountId: number;

  get nameInvalid() {
    const name = this.formgroup.get('name');
    return name.invalid && (name.touched || name.dirty);
  }

  get documentInvalid() {
    const document = this.formgroup.get('document');
    return document.invalid && (document.touched || document.dirty);
  }

  get telephoneInvalid() {
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
    private authService: AuthService,
    private toastService: ToastService
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

    const request = this.accountId
      ? this.accountService.update(this.accountId, accountRequest)
      : this.accountService.create(accountRequest);

    request.subscribe({
      next: (accountResponse: AccountResponse) => {
        const jwtUser = this.authService.jwtUser$.value;
        jwtUser.accountId = accountResponse.id;
        this.authService.updateJwtUser(jwtUser);
        this.toastService.addToast({
          title: 'Sucesso',
          message: 'Conta atualizada com sucesso!',
          type: 'success',
          timeout: 5000,
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.toastService.addToast({
          title: 'Erro',
          message: error.message,
          type: 'error',
          timeout: 5000,
        });
      },
    });
  }

  private fillForm(jwtUser: JwtUser) {
    if (jwtUser?.accountId == null) return;
    this.accountId = jwtUser.accountId;
    this.accountService.findById(jwtUser.accountId).subscribe({
      next: (account: AccountResponse) => {
        this.formgroup.patchValue(account);
      },
    });
  }
}
