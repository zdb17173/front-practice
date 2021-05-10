import React from 'react'

export default [
        {
            path: "/date",
            showName : "date",
            breadcrumbName: 'news',
            children: [
                {
                    path: "/date/datepicker",
                    showName : "datepicker",
                    breadcrumbName: "datepicker"
                }
            ]
        },
        {
            path: "/home",
            showName : "home",
            // component: require('./src/components/home.js').default,
            // component: React.lazy(() => import('./src/components/home')),
            breadcrumbName: 'home',
            children: [
                {
                    hideInMenu: true,
                    path: "/news/newsDetail",
                    showName : "newsDetail",
                    breadcrumbName: "newsDetail"
                }
            ]
        },
        {
            path: "/user",
            showName : "user",
            // component: require('./src/components/user.js').default,
            // component: React.lazy(() => import('./src/components/user')),
            breadcrumbName: 'user'
        },
        {
            path: "/admin",
            showName : "admin",
            // component: require('./src/components/admin.js').default,
            // component: React.lazy(() => import('./src/components/admin')),
            breadcrumbName: 'admin'
        },
        {
            path: "/form",
            showName : "form",
            breadcrumbName: 'form'
        },
        {
            path: "/dynform",
            showName : "dynform",
            breadcrumbName: 'dynform'
        }
];