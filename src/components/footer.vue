<script setup lang="ts">
const emit = defineEmits<{
    (e: "open-login"): void;
    (e: "open-register"): void;
}>();

</script>

<template>
    <footer class="footer">
        <div class="footer__grid">
            <div class="footer__brand">
                <div class="footer__brand-top">
                    <img src="/logo.jpg" alt="SmartBiz" class="footer__logo" />
                    <h3 class="footer__brand-name">SmartBiz</h3>
                </div>
                <p class="footer__text">
                    Giải pháp quản lý kinh doanh thông minh, giúp doanh nghiệp tối ưu hóa hoạt động và tăng trưởng bền
                    vững.
                </p>
            </div>

            <div class="footer__group">
                <h4 class="footer__heading">Liên kết</h4>
                <a href="" class="footer__link">Trang chủ</a>
                <a  @click.stop="emit('open-login')" class="footer__link hover:cursor-pointer">Đăng nhập</a>
                <a  @click.stop="emit('open-register')" class="footer__link hover:cursor-pointer">Đăng ký</a>
            </div>

            <div class="footer__group">
                <h4 class="footer__heading">Liên hệ</h4>
                <p class="footer__contact">contact@smartbiz.vn</p>
                <p class="footer__contact">+84 123 456 789</p>
                <p class="footer__contact">Đà Nẵng, Việt Nam</p>
            </div>

            <div class="footer__group">
                <h4 class="footer__heading">Theo dõi chúng tôi</h4>
                <div class="footer__socials">
                    <a href="#" class="footer__social" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm5 2.3A5.5 5.5 0 1 1 6.5 12 5.5 5.5 0 0 1 12 6.5Zm0 2.2a3.3 3.3 0 1 0 3.3 3.3A3.3 3.3 0 0 0 12 8.7Zm5.75-2.9a1.3 1.3 0 1 1-1.3 1.3 1.3 1.3 0 0 1 1.3-1.3Z" />
                        </svg>
                    </a>
                    <a href="#" class="footer__social" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M13.5 22v-8h2.7l.5-3h-3.2V9.1c0-.9.3-1.6 1.7-1.6H17V4.8a19.8 19.8 0 0 0-2.5-.2c-2.5 0-4.2 1.5-4.2 4.4V11H7.5v3h2.8v8Z" />
                        </svg>
                    </a>
                    <a href="#" class="footer__social" aria-label="X">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M18.9 3H21l-4.6 5.3L22 21h-4.8l-3.8-5-4.4 5H7l5-5.8L2 3h4.9l3.4 4.5L14.2 3Zm-1.7 16h1.3L8.1 4.9H6.7Z" />
                        </svg>
                    </a>
                    <a href="#" class="footer__social" aria-label="Telegram">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M21.4 4.6a1 1 0 0 0-1-.1L3.3 11.2a1 1 0 0 0 .1 1.9l4.4 1.4 1.7 5.2a1 1 0 0 0 1.8.3l2.5-3.4 4.3 3.1a1 1 0 0 0 1.6-.6l2.1-13.4a1 1 0 0 0-.4-1.1ZM9.3 13.9l7.9-5.4-6.3 6.6-.3 2.8Z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <div class="footer__bottom">
            <p>© 2026 SmartBiz. All rights reserved.</p>
        </div>
    </footer>
</template>

<style scoped src="../scss/footer.scss" lang="scss"></style>
