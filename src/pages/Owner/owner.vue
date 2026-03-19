<script setup lang="ts">
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogout = async () => {
    Cookies.remove("token");
    Cookies.remove("role");
    sessionStorage.removeItem("fullname");
    await router.push("/");
};
</script>

<template>
    <section class="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div class="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-md">
            <h1 class="text-4xl font-bold">Owner Dashboard</h1>
            <button
                type="button"
                class="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                @click="handleLogout"
            >
                Đăng xuất
            </button>
        </div>
    </section>
</template>
