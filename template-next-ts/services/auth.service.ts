import { authorizedAPI, unauthorizedAPI } from "@/config/axios.config";
import { UtilsService } from "./utils.service";
import { ChangePasswordFormData, ForgotPasswordFormData, ResetPasswordFormData, VerifyEmailFormData } from "@/lib/schemas";

export class AuthService {
    constructor(
        private readonly utils: UtilsService
    ) { }

    register(userData: RegisterDto): Promise<any> {
        return this.utils.handleApiRequest(() => unauthorizedAPI.post('/auth/register', userData));
    }

    login(userData: LoginDto): Promise<any> {
        return this.utils.handleApiRequest(() => unauthorizedAPI.post('/auth/login', userData));
    }

    changePassword(data: ChangePasswordFormData): Promise<any> {
        return this.utils.handleApiRequest(() => authorizedAPI.post('/auth/change-password', data));
    }

    forgotPassword(data: ForgotPasswordFormData): Promise<any> {
        return this.utils.handleApiRequest(() => unauthorizedAPI.post('/auth/forgot-password', data));
    }

    resetPassword(data: ResetPasswordFormData): Promise<any> {
        return this.utils.handleApiRequest(() => unauthorizedAPI.post('/auth/reset-password', data));
    }

    resendOtp(email: string): Promise<any> {
        return this.utils.handleApiRequest(() => unauthorizedAPI.post('/auth/resend-otp', { email }));
    }

    verifyEmail(data: VerifyEmailFormData): Promise<any> {
        return this.utils.handleApiRequest(() => unauthorizedAPI.post('/auth/verify-email', data));
    }

}