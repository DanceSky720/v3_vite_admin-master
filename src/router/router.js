import Layout from "../layout/Index.vue";
import RouteView from "../components/RouteView.vue";

const layoutMap = [
    {
        path: "",
        name: "Index",
        meta: { title: "控制台", icon: "HomeFilled" },
        component: () => import("../views/index/Index.vue")
    },
    {
        path: "admin",
        name: "Admin",
        meta: { title: "用户管理", icon: "User", roles: ["admin"] },
        component: RouteView,
        children: [
            {
                path: "",
                name: "AdminAuth",
                meta: { title: "用户列表" },
                component: () => import("../views/admin/AuthList.vue")
            },
            {
                path: "role",
                name: "AdminRole",
                meta: { title: "角色列表" },
                component: () => import("../views/admin/RoleList.vue")
            }
        ]
    },
    {
        path: "user",
        name: "User",
        hidden: true /* 不在侧边导航展示 */,
        meta: { title: "个人中心" },
        component: () => import("../views/admin/User.vue")
    },
    {
        path: "test",
        name: "Test",
        meta: { title: "测试" },
        component: RouteView,
        children: [
            {
                path: "v1",
                name: "v1Test",
                meta: { title: "v1测试" },
                component: () => import("../views/test/v1/index.vue")
            },
            {
                path: "v2",
                name: "v2Test",
                meta: { title: "v2测试" },
                component: () => import("../views/test/v2/index.vue")
            },
            {
                path: "v3",
                name: "v3Test",
                meta: { title: "v3测试" },
                component: () => import("../views/test/v3/index.vue")
            }
        ]
    },
    {
        path: "/error",
        name: "NotFound",
        hidden: true,
        meta: { title: "404" },
        component: () => import("../components/NotFound.vue")
    },
    {
        path: "/:w+",
        hidden: true,
        redirect: { name: "NotFound" }
    }
];

const routes = [
    { path: "/login", name: "Login", meta: { title: "登录" }, component: () => import("../views/login/Login.vue") },
    { path: "/", name: "Layout", component: Layout, children: [...layoutMap] }
];

export { routes, layoutMap };
