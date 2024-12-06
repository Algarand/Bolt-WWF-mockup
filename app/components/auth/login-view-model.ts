import { Observable } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../services/navigation.service';

export class LoginViewModel extends Observable {
    private authService: AuthService;
    private navigationService: NavigationService;
    
    private _email = '';
    private _password = '';
    private _loading = false;
    private _errorMessage = '';

    constructor() {
        super();
        this.authService = new AuthService();
        this.navigationService = new NavigationService();
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
        }
    }

    get loading(): boolean {
        return this._loading;
    }

    get errorMessage(): string {
        return this._errorMessage;
    }

    async onLogin() {
        if (!this.validateForm()) {
            return;
        }

        try {
            this._loading = true;
            this.notifyPropertyChange('loading', true);
            this._errorMessage = '';
            this.notifyPropertyChange('errorMessage', '');

            const user = await this.authService.signIn(this._email, this._password);
            if (user) {
                this.navigationService.navigateWithClearHistory('main-page');
            }
        } catch (error) {
            this._errorMessage = error.message || 'Invalid credentials';
            this.notifyPropertyChange('errorMessage', this._errorMessage);
        } finally {
            this._loading = false;
            this.notifyPropertyChange('loading', false);
        }
    }

    onSignUp() {
        this.navigationService.navigate('components/auth/signup-page');
    }

    private validateForm(): boolean {
        if (!this._email || !this._password) {
            this._errorMessage = 'Please fill in all fields';
            this.notifyPropertyChange('errorMessage', this._errorMessage);
            return false;
        }
        return true;
    }
}