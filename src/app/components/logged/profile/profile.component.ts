import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
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

  get nameValid() {
    const name = this.formgroup.get('name');
    return name.invalid && (name.touched || name.dirty);
  }

  get documentValid() {
    const document = this.formgroup.get('document');
    return document.invalid && (document.touched || document.dirty);
  }

  constructor(private formBuilder: FormBuilder) {}

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
  }

  onFormSubmit() {
    if (this.formgroup.invalid) return;
    console.log('Ainda não funciona');
    console.log(this.formgroup.value);
  }
}
