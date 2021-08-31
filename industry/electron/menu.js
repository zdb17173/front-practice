import React from 'react'



const menu = [
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
        },
        {
            path: "/songfen",
            showName : "songfen",
            breadcrumbName: 'songfen'
        },
        {
            path: "/hanjie",
            showName : "hanjie",
            breadcrumbName: 'hanjie'
        },
        {
            path: "/hanjielist",
            showName : "hanjielist",
            breadcrumbName: 'hanjielist'
        },
        {
            path: "/pufen",
            showName : "pufen",
            breadcrumbName: 'pufen'
        }
];


const dbMenu = [
    {
        path: "/hanjie",
        showName : "焊接知识库",
        breadcrumbName: '焊接知识库'
    },
    {
        path: "/hanjielist",
        showName : "焊接知识库列表",
        breadcrumbName: '焊接知识库列表'
    },
    {
        path: "/songfen",
        showName : "增材-送粉知识库",
        breadcrumbName: '送粉知识库'
    },
    {
        path: "/pufen",
        showName : "增材-铺粉知识库",
        breadcrumbName: '增材-铺粉知识库'
    }
];

export default dbMenu;