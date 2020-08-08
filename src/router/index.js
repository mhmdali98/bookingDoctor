import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '*',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/user/home')
    },
    {
        path: '/log',
        name: 'login',
        component: () => import('../views/login')
    },

    {
        path: '/booking',
        name: 'booking',
        component: () => import('../views/user/booking')
    },
    {
        path: '',
        name: 'layout',
        component: () => import('../views/Layout'),
        children: [{
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('../views/Dashboard/dashboard')
            },
            {
                path: 'allLab',
                name: 'dashboard.allLab',
                component: () => import('../views/Dashboard/allLab')
            },
            {
                path: 'users',
                name: 'dashboard.users',
                component: () => import('../views/Dashboard/users')
            },
            {
                path: 'test',
                name: 'lab.test',
                component: () => import('../views/lab/test')
            },
            {
                path: 'date',
                name: 'lab.date',
                component: () => import('../views/lab/date')
            },
            {
                path: 'books',
                name: 'lab.books',
                component: () => import('../views/lab/books')
            },
            {
                path: 'result',
                name: 'result',
                props: true,
                component: () => import('../views/lab/result')
            }
        ]
    }
]

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})