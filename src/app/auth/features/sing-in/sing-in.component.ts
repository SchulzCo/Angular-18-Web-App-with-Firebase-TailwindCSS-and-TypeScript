import { Component, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'; 
import { hasEmailError } from '../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

interface FormSingIn{
email: FormControl<string|null>;
password: FormControl<string|null>;
}

@Component({
  selector: 'app-sing-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './sing-in.component.html',
})
export default class SingUpComponent {
  private _formBuilder = inject(FormBuilder); 
  private _authService = inject(AuthService);
  private _router = inject(Router);

 isRequired(field: 'email' | 'password'): boolean {
  const control = this.form.get(field);
  return !!(control && control.hasError('required') && control.touched);
}

isEmailError(){
  return hasEmailError(this.form);
}

  from = this._formBuilder.group<FormSingIn>({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', Validators.required),
  });

  form = this.from;

  async submit() {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value;

    if (!email || !password) return;

    await this._authService.singIn({email, password});

    toast.success('Nice to see you again');
    this._router.navigateByUrl('/tasks');
  }
    catch (error) {
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
