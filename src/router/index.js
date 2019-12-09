import Vue from 'vue';
import Router from 'vue-router';
import app from '../App.vue';

Vue.use(Router)
let router = new Router({
        routes: [
    {
      path: "/",
                component: app, //顶层路由，对应index.html
                children: [ //二级路由。对应App.vue
                    {
                        path:"/",
                        redirect:'ToolList'
                    },
                    {
                        path: '/ToolList',
                        name: '/ToolList',
                        component: resolve => require(['../views/ToolList.vue'], resolve),
                        meta: {keepAlive: true, bodyBg: "#fff"}
                    },
                    {
                        path: '/SignatureIndex',
                        name: '/SignatureIndex',
                        component: resolve => require(['../views/signature/SignatureIndex.vue'], resolve),
                        meta: {keepAlive: true, bodyBg: "#fff"}
                    },
                ]
            }

        ],
        scrollBehavior(to, from, savedPosition) {
            console.log("savedPosition", savedPosition);
            if (savedPosition) {
                return savedPosition
            } else {
                return {x: 0, y: 0}
            }
        }
    }
)


router.afterEach((to, from) => {

    if (to.meta.bodyBg == undefined) {
        window.document.body.style.backgroundColor = '#fff';
    } else {
        window.document.body.style.backgroundColor = to.meta.bodyBg;
        console.log('123', window.document.body.style.backgroundColor)
    }
})


export default router;
