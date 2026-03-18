import Cookies from "js-cookie";
import { createRouter, createWebHistory } from "vue-router";

const HomePage = () => import("../pages/Auth/home.vue");
const AdminPage = () => import("../pages/Admin/admin.vue");
const CashierPage = () => import("../pages/Cashier/cashier.vue");
const ChefPage = () => import("../pages/Chef/chef.vue");
const OwnerPage = () => import("../pages/Owner/owner.vue");
const StaffPage = () => import("../pages/Staff/staff.vue");

const roleRouteMap = {
    ADMIN: "/admin",
    CASHIER: "/cashier",
    CHEF: "/chef",
    OWNER: "/owner",
    STAFF: "/staff"
} as const;

type AppRole = keyof typeof roleRouteMap;

const normalizeRole = (role: string | undefined): AppRole | null => {
    if (!role) {
        return null;
    }

    const normalized = role.replace(/^"|"$/g, "").toUpperCase();
    return normalized in roleRouteMap ? (normalized as AppRole) : null;
};

export const resolveRoleRoute = (role: string | undefined) => {
    const normalizedRole = normalizeRole(role);
    return normalizedRole ? roleRouteMap[normalizedRole] : "/";
};

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage
        },
        {
            path: "/admin",
            name: "admin",
            component: AdminPage,
            meta: { requiresAuth: true, roles: ["ADMIN"] }
        },
        {
            path: "/cashier",
            name: "cashier",
            component: CashierPage,
            meta: { requiresAuth: true, roles: ["CASHIER"] }
        },
        {
            path: "/chef",
            name: "chef",
            component: ChefPage,
            meta: { requiresAuth: true, roles: ["CHEF"] }
        },
        {
            path: "/owner",
            name: "owner",
            component: OwnerPage,
            meta: { requiresAuth: true, roles: ["OWNER"] }
        },
        {
            path: "/staff",
            name: "staff",
            component: StaffPage,
            meta: { requiresAuth: true, roles: ["STAFF"] }
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/"
        }
    ]
});

router.beforeEach(to => {
    const token = Cookies.get("token");
    const role = normalizeRole(Cookies.get("role"));
    const targetByRole = role ? roleRouteMap[role] : "/";
    const requiresAuth = Boolean(to.meta.requiresAuth);
    const allowedRoles = (to.meta.roles as AppRole[] | undefined) ?? [];

    if (!token) {
        return requiresAuth ? "/" : true;
    }

    if (to.path === "/") {
        return targetByRole;
    }

    if (requiresAuth && (!role || !allowedRoles.includes(role))) {
        return targetByRole;
    }

    return true;
});

export default router;
