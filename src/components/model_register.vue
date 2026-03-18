<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import type { GenericObject } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { API_Register, API_SendOTP } from "../api/API_Auth";
import type { ReqRegister } from "../interface/auth";

const props = defineProps<{
    open: boolean;
}>();

const emit = defineEmits<{
    (e: "close"): void;
    (e: "open-login"): void;
}>();

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isSubmitting = ref(false);
const submitError = ref("");
const otpCode = ref("");
const isOtpStep = ref(false);
const sentOtpCode = ref("");
const pendingRegisterPayload = ref<ReqRegister | null>(null);

const registerSchema = toTypedSchema(z.object({
    fullName: z.string().min(1, "Vui lòng nhập họ tên"),
    email: z.string().email("Email không hợp lệ"),
    phone: z
        .string()
        .min(1, "Vui lòng nhập số điện thoại")
        .regex(/^[0-9+\s()-]{8,15}$/, "Số điện thoại không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(6, "Vui lòng xác nhận mật khẩu")
}).refine(values => values.password === values.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"]
}));

const initialValues = computed(() => ({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
}));

const lockBodyScroll = (locked: boolean) => {
    if (typeof document === "undefined") {
        return;
    }

    document.documentElement.style.overflow = locked ? "hidden" : "";
    document.documentElement.style.touchAction = locked ? "none" : "";
    document.body.style.overflow = locked ? "hidden" : "";
    document.body.style.touchAction = locked ? "none" : "";
};

const resetOtpState = () => {
    otpCode.value = "";
    isOtpStep.value = false;
    sentOtpCode.value = "";
    pendingRegisterPayload.value = null;
};

const handleSubmit = async (values: GenericObject) => {
    submitError.value = "";
    isSubmitting.value = true;

    try {
        if (!isOtpStep.value) {
            const payload: ReqRegister = {
                fullName: String(values.fullName ?? ""),
                email: String(values.email ?? ""),
                phoneNumber: String(values.phone ?? ""),
                password: String(values.password ?? "")
            };

            const otpResponse = await API_SendOTP(payload.email);
            pendingRegisterPayload.value = payload;
            sentOtpCode.value = String(otpResponse.otp ?? "");
            isOtpStep.value = true;
            submitError.value = otpResponse.otp
                ? "Mã OTP đã được gửi tới email của bạn. Vui lòng nhập mã để hoàn tất đăng ký."
                : "OTP đã được gửi. Vui lòng nhập mã xác thực để tiếp tục.";
            return;
        }

        if (!otpCode.value.trim()) {
            submitError.value = "Vui lòng nhập mã OTP.";
            return;
        }

        if (sentOtpCode.value && otpCode.value.trim() !== sentOtpCode.value.trim()) {
            submitError.value = "Mã OTP không chính xác.";
            return;
        }

        if (!pendingRegisterPayload.value) {
            submitError.value = "Thiếu thông tin đăng ký. Vui lòng nhập lại.";
            isOtpStep.value = false;
            return;
        }

        const res = await API_Register(pendingRegisterPayload.value);
        console.log("Register success:", res);
        resetOtpState();
        emit("close");
    } catch (error) {
        console.error("Register submit failed:", error);
        submitError.value = isOtpStep.value
            ? "Xác thực OTP thất bại. Vui lòng thử lại."
            : "Gửi OTP thất bại. Vui lòng kiểm tra lại email.";
    } finally {
        isSubmitting.value = false;
    }
};

const handleOverlay = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
        resetOtpState();
        emit("close");
    }
};

watch(
    () => props.open,
    value => {
        lockBodyScroll(value);
    },
    { immediate: true }
);

onUnmounted(() => {
    lockBodyScroll(false);
});

watch(
    () => props.open,
    value => {
        if (!value) {
            resetOtpState();
            submitError.value = "";
        }
    }
);
</script>

<template>
    <transition name="login-modal">
        <div v-if="open" class="login-modal" @click="handleOverlay">
            <div class="login-card login-card--register">
                <button class="login-card__close" type="button" aria-label="Dong" @click="emit('close')">
                    ×
                </button>

                <div class="login-card__layout">
                    <div class="login-card__aside">
                        <div class="login-card__header">
                            <div class="login-card__badge">
                                <img src="/logo.jpg" alt="SmartBiz" class="login-card__logo" />
                            </div>

                            <div class="login-card__hero">
                                <h2>Create account</h2>
                                <p>Fill in your information to get started with SmartBiz.</p>
                            </div>
                        </div>

                        <div class="login-social login-social--register">
                            <button type="button" class="login-social__button gap-4" aria-label="Google">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    class="login-social__icon login-social__icon--google">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4" />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853" />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                        fill="#FBBC05" />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335" />
                                </svg>
                                <span>Continue with Google</span>
                            </button>
                        </div>

                        <div class="login-divider login-divider--register">
                            <span>OR CREATE WITH EMAIL</span>
                        </div>
                    </div>

                    <div class="login-card__main">
                        <VForm :validation-schema="registerSchema" :initial-values="initialValues"
                            class="login-form login-form--register" @submit="handleSubmit">
                            <div class="login-form__grid">
                                <div class="login-form__group">
                                    <label for="register-full-name">Họ và tên<span class="login-form__required">*</span></label>
                                    <Field id="register-full-name" name="fullName" type="text" class="login-form__input"
                                        :disabled="isOtpStep || isSubmitting"
                                        placeholder="Nhập họ và tên của bạn" />
                                    <ErrorMessage name="fullName" class="login-form__error" />
                                </div>

                                <div class="login-form__group">
                                    <label for="register-email">Email<span class="login-form__required">*</span></label>
                                    <Field id="register-email" name="email" type="email" class="login-form__input"
                                        :disabled="isOtpStep || isSubmitting"
                                        placeholder="name@example.com" />
                                    <ErrorMessage name="email" class="login-form__error" />
                                </div>

                                <div class="login-form__group">
                                    <label for="register-phone">Số điện thoại<span class="login-form__required">*</span></label>
                                    <Field id="register-phone" name="phone" type="text" class="login-form__input"
                                        :disabled="isOtpStep || isSubmitting"
                                        placeholder="Nhập số điện thoại" />
                                    <ErrorMessage name="phone" class="login-form__error" />
                                </div>

                                <div class="login-form__group">
                                    <label for="register-password">Mật khẩu<span class="login-form__required">*</span></label>
                                    <div class="login-form__password">
                                        <Field id="register-password" name="password"
                                            :type="showPassword ? 'text' : 'password'" class="login-form__input"
                                            :disabled="isOtpStep || isSubmitting"
                                            placeholder="Nhập mật khẩu" />
                                        <button class="login-form__toggle" type="button" aria-label="Toggle password"
                                            @click="showPassword = !showPassword">
                                            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                                <path
                                                    d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                                <path
                                                    d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                                <line x1="2" x2="22" y1="2" y2="22" />
                                            </svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        </button>
                                    </div>
                                    <ErrorMessage name="password" class="login-form__error" />
                                </div>

                                <div class="login-form__group login-form__group--full">
                                    <label for="register-confirm-password">Xác nhận mật khẩu<span class="login-form__required">*</span></label>
                                    <div class="login-form__password">
                                        <Field id="register-confirm-password" name="confirmPassword"
                                            :type="showConfirmPassword ? 'text' : 'password'"
                                            class="login-form__input" :disabled="isOtpStep || isSubmitting"
                                            placeholder="Nhập lại mật khẩu" />
                                        <button class="login-form__toggle" type="button"
                                            aria-label="Toggle confirm password"
                                            @click="showConfirmPassword = !showConfirmPassword">
                                            <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                                <path
                                                    d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                                <path
                                                    d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                                <line x1="2" x2="22" y1="2" y2="22" />
                                            </svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        </button>
                                    </div>
                                    <ErrorMessage name="confirmPassword" class="login-form__error" />
                                </div>

                                <div v-if="isOtpStep" class="login-form__group login-form__group--full">
                                    <label for="register-otp">Mã OTP<span class="login-form__required">*</span></label>
                                    <input
                                        id="register-otp"
                                        v-model="otpCode"
                                        type="text"
                                        class="login-form__input"
                                        placeholder="Nhập mã OTP đã gửi về email"
                                    />
                                </div>
                            </div>

                            <p v-if="submitError" :class="isOtpStep && !submitError.includes('thất bại') && !submitError.includes('không') ? 'login-form__hint' : 'login-form__error'">
                                {{ submitError }}
                            </p>

                            <button class="login-form__submit" type="submit" :disabled="isSubmitting">
                                {{ isSubmitting ? "Processing..." : (isOtpStep ? "Verify OTP & Create account" : "Send OTP") }}
                            </button>
                        </VForm>

                        <div class="login-card__footer login-card__footer--register">
                            <p>
                                Already have an account?
                                <button type="button" @click.stop="emit('open-login')">Sign in</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped src="../scss/login.scss" lang="scss"></style>
