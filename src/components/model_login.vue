<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import type { GenericObject } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import axios from "axios";
import { API_Login } from "../api/API_Auth";
import type { ReqLogin } from "../interface/auth";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { resolveRoleRoute } from "../router";

const props = defineProps<{
    open: boolean;
}>();

const emit = defineEmits<{
    (e: "close"): void;
    (e: "open-register"): void;
}>();

const showPassword = ref(false);
const isSubmitting = ref(false);
const submitError = ref("");
const router = useRouter();

type LoginFormActions = {
    setFieldError: (field: string, message?: string) => void;
};

const loginSchema = toTypedSchema(z.object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự")
}));

const initialValues = computed<ReqLogin>(() => ({
    email: "",
    password: ""
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

const handleSubmit = async (values: GenericObject, actions: LoginFormActions) => {
    const payload: ReqLogin = {
        email: String(values.email ?? ""),
        password: String(values.password ?? "")
    };

    submitError.value = "";
    actions.setFieldError("email", undefined);
    actions.setFieldError("password", undefined);
    isSubmitting.value = true;

    try {
        const res = await API_Login(payload);
        Cookies.set("token", res.token, { expires: 7 });
        Cookies.set("role", res.role, { expires: 7 });
        sessionStorage.setItem("fullname", res.fullName);
        
        console.log("Login success:", res);
        emit("close");
        await router.push(resolveRoleRoute(res.role));
    } catch (error) {
        console.error("Login payload failed:", error);
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const rawMessage = error.response?.data?.message ?? error.response?.data?.error ?? "";
            const message = String(rawMessage).toLowerCase();

            if (
                message.includes("email") ||
                message.includes("account") ||
                message.includes("tài khoản") ||
                status === 404
            ) {
                actions.setFieldError("email", "Tài khoản không tồn tại hoặc không hợp lệ.");
                return;
            }

            if (
                message.includes("password") ||
                message.includes("mật khẩu")
            ) {
                actions.setFieldError("password", "Mật khẩu không đúng.");
                return;
            }

            if (status === 401) {
                actions.setFieldError("password", "Sai tài khoản hoặc mật khẩu.");
                return;
            }
        }

        submitError.value = "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.";
    } finally {
        isSubmitting.value = false;
    }
};

const handleOverlay = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
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
</script>

<template>
    <transition name="login-modal">
        <div v-if="open" class="login-modal" @click="handleOverlay">
            <div class="login-card">
                <button class="login-card__close" type="button" aria-label="Dong" @click="emit('close')">
                    ×
                </button>

                <div class="login-card__header">
                    <div class="login-card__badge">
                        <img src="/logo.jpg" alt="SmartBiz" class="login-card__logo" />
                    </div>

                    <div class="login-card__hero">
                        <h2>Welcome back</h2>
                        <p>Enter your credentials to sign in</p>
                    </div>
                </div>

                <div class="login-social">
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

                <div class="login-divider">
                    <span>OR CONTINUE WITH</span>
                </div>

                <VForm :validation-schema="loginSchema" :initial-values="initialValues" class="login-form"
                    @submit="handleSubmit">
                    <div class="login-form__group">
                        <label for="login-email">Email<span class="login-form__required">*</span></label>
                        <Field id="login-email" name="email" type="email" class="login-form__input"
                            placeholder="name@example.com" />
                        <ErrorMessage name="email" class="login-form__error" />
                    </div>

                    <div class="login-form__group">
                        <label for="login-password">Password<span class="login-form__required">*</span></label>
                        <div class="login-form__password">
                            <Field id="login-password" name="password" :type="showPassword ? 'text' : 'password'"
                                class="login-form__input" placeholder="Enter your password" />
                            <button class="login-form__toggle" type="button" aria-label="Toggle password"
                                @click="showPassword = !showPassword">
                                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                    <path
                                        d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                    <line x1="2" x2="22" y1="2" y2="22" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </button>
                        </div>
                        <ErrorMessage name="password" class="login-form__error" />
                    </div>

                    <p v-if="submitError" class="login-form__error">{{ submitError }}</p>

                    <button class="login-form__submit" type="submit" :disabled="isSubmitting">
                        {{ isSubmitting ? "Signing in..." : "Sign In" }}
                    </button>
                </VForm>

                <div class="login-card__footer">
                    <p>
                        Don&apos;t have an account?
                        <button @click.stop="emit('open-register')" type="button">Sign up</button>
                    </p>
                    <button type="button" class="login-card__link">Forgot your password?</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped src="../scss/login.scss" lang="scss"></style>
