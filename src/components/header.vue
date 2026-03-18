<script setup lang="ts">
const menuItems = ["Sign In", "Sign Up"];
const emit = defineEmits<{
    (e: "open-login"): void;
    (e: "open-register"): void;
}>();

const handleClick = (item: string) => {
    if (item === "Sign In") {
        emit("open-login");
    }

    if (item === "Sign Up") {
        emit("open-register");
    }
};
</script>

<template>
    <div class="header-shell">
        <nav class="header">
            <div class="header__brand">
                <img src="/logo.jpg" alt="SmartBiz" class="header__logo" />
                <h1 class="header__title">SmartBiz</h1>
            </div>

            <ul class="header__menu">
                <li v-for="item in menuItems" :key="item">
                    <button type="button" class="header__menu-button" @click.stop="handleClick(item)">
                        {{ item }}
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped src="../scss/header.scss" lang="scss"></style>
