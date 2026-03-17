<script setup lang="ts">
import { ref } from "vue";

const activeItem = ref("Home");

const menuItems = ["Home", "Sign In", "Sign Up"];
</script>

<template>
    <div class="navbar-shell">
        <nav class="navbar">
            <div class="navbar__brand">
                <img src="/logo.jpg" alt="SmartBiz" class="navbar__logo" />
                <h1 class="navbar__title">SmartBiz</h1>
            </div>

            <ul class="navbar__menu">
                <li
                    v-for="item in menuItems"
                    :key="item"
                    :class="{ 'is-active': activeItem === item }"
                    @click="activeItem = item"
                >
                    {{ item }}
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped src="../scss/navbar.scss" lang="scss"></style>
