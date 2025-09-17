import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { hasEmailError } from '../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './sing-up.component.html',
})
export default class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group<FormSignUp>({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', Validators.required),
  });

  isRequired(field: 'email' | 'password'): boolean {
    const control = this.form.get(field);
    return !!(control && control.hasError('required') && control.touched);
  }

  isEmailError(): boolean {
  return !!hasEmailError(this.form);
}


  async submit(){
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    if (!email || !password) return;

    try {
      await this._authService.singUp({ email, password });
      toast.success('User successfully created');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  async  submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();
      toast.success('Signed in with Google');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Google sign-in failed');
    }
  }
}