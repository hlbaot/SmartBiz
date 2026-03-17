<script setup lang="ts">
import AOS from "aos";
import { onMounted } from 'vue'
import 'aos/dist/aos.css'
import Footer from "../../components/footer.vue";
import LightRays from "../../uiux/LightRays.vue";
import Navbar from "../../components/navbar.vue";
import GradientText from "../../uiux/GradientText.vue";
import CountUp from "../../uiux/CountUp.vue";
const handleStart = () => {
    console.log("Count animation started!");
};

const handleEnd = () => {
    console.log("Count animation ended!");
};

onMounted(() => {
    AOS.init({
        duration: 800,
        once: true,
    })
})
</script>

<template>
    <section class="auth-home">
        <div class="auth-home__background">
            <LightRays class="auth-home__rays" rays-origin="top-center" rays-color="#ffffff" :rays-speed="1.1"
                :light-spread="0.65" :ray-length="1.7" :follow-mouse="true" :mouse-influence="0.05" :noise-amount="0"
                :distortion="0" :fade-distance="1.4" :saturation="0" class-name="opacity-90" />
            <div class="auth-home__overlay"></div>
        </div>

        <div class="auth-home__content">
            <Navbar />
            <article class="hero">
                <h2 class="hero__title">
                    Quản lý kinh doanh
                    <GradientText :colors="['#2f3640', '#cbd5e1', '#111827']" :animation-speed="3" :show-border="false"
                        class-name="hero__gradient">
                        thông minh
                    </GradientText>
                </h2>
                <p class="hero__description">
                    SmartBiz - Giải pháp toàn diện giúp doanh nghiệp tối ưu hóa vận hành, tăng trưởng doanh thu và quản
                    lý
                    hiệu quả mọi hoạt động kinh doanh.
                </p>
                <div class="hero__actions">
                    <button class="hero__button hero__button--primary">Bắt đầu miễn phí</button>
                </div>
            </article>

            <section class="stats">
                <article data-aos="zoom-in" class="stats__card">
                    <strong class="stats__value">
                        <CountUp :from="0" :to="1000" separator="," direction="up" :duration="1" :delay="0"
                            :start-when="true" class-name="count-up-text" @start="handleStart" @end="handleEnd" />
                    </strong>
                    <span class="stats__label">Doanh nghiệp</span>
                </article>
                <article data-aos="zoom-in" class="stats__card">
                    <strong class="stats__value">
                        <CountUp :from="10" :to="50" separator="," direction="up" :duration="1" :delay="0"
                            :start-when="true" class-name="count-up-text" @start="handleStart" @end="handleEnd" />K+
                    </strong>
                    <span class="stats__label">Người dùng</span>
                </article>
                <article data-aos="zoom-in" class="stats__card">
                    <strong class="stats__value">
                        <CountUp :from="10" :to="100" separator="," direction="up" :duration="1" :delay="0"
                            :start-when="true" class-name="count-up-text" @start="handleStart" @end="handleEnd" />%
                    </strong>
                    <span class="stats__label">Uptime</span>
                </article>
                <article data-aos="zoom-in" class="stats__card">
                    <strong class="stats__value">24/7</strong>
                    <span class="stats__label">Hỗ trợ</span>
                </article>
            </section>

            <div class="feature">
                <div class="feature__heading">
                    <h2 class="feature__title">Tính năng nổi bật</h2>
                    <p class="feature__subtitle">Tất cả những gì bạn cần để quản lý doanh nghiệp hiệu quả</p>
                </div>

                <div class="feature__grid">
                    <article class="feature__card" data-aos="fade-up">
                        <div class="feature__icon">📊</div>
                        <h3 class="feature__card-title">Quản lý Doanh thu</h3>
                        <p class="feature__card-text">
                            Theo dõi doanh thu theo thời gian thực, phân tích xu hướng và tối ưu hóa lợi nhuận.
                        </p>
                    </article>

                    <article class="feature__card feature__card" data-aos="fade-up" data-aos-delay="80">
                        <div class="feature__icon">👥</div>
                        <h3 class="feature__card-title">Quản lý Nhân viên</h3>
                        <p class="feature__card-text">
                            Quản lý ca làm việc, theo dõi hiệu suất và tối ưu hóa nhân sự trong một giao diện duy nhất.
                        </p>
                    </article>

                    <article class="feature__card" data-aos="fade-up" data-aos-delay="160">
                        <div class="feature__icon">📦</div>
                        <h3 class="feature__card-title">Quản lý Kho hàng</h3>
                        <p class="feature__card-text">
                            Kiểm soát tồn kho, cảnh báo hết hàng và quản lý nhập xuất tự động chính xác hơn.
                        </p>
                    </article>

                    <article class="feature__card" data-aos="fade-up">
                        <div class="feature__icon">🏬</div>
                        <h3 class="feature__card-title">Đa Chi nhánh</h3>
                        <p class="feature__card-text">
                            Quản lý nhiều cửa hàng từ một nền tảng duy nhất với dữ liệu được đồng bộ xuyên suốt.
                        </p>
                    </article>

                    <article class="feature__card" data-aos="fade-up" data-aos-delay="80">
                        <div class="feature__icon">📈</div>
                        <h3 class="feature__card-title">Báo cáo Thông minh</h3>
                        <p class="feature__card-text">
                            Phân tích dữ liệu chi tiết với biểu đồ trực quan và insights để ra quyết định nhanh hơn.
                        </p>
                    </article>

                    <article class="feature__card" data-aos="fade-up" data-aos-delay="160">
                        <div class="feature__icon">🔒</div>
                        <h3 class="feature__card-title">Bảo mật Cao</h3>
                        <p class="feature__card-text">
                            Mã hóa dữ liệu và phân quyền người dùng chặt chẽ để bảo vệ toàn bộ hoạt động kinh doanh.
                        </p>
                    </article>
                </div>
            </div>

            <Footer />
        </div>
    </section>
</template>

<style scoped src="../../scss/home.scss" lang="scss"></style>
