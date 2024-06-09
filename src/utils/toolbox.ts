import router from '@/router'
import type { Router } from 'vue-router'
export default class toolbox {

    /**
     * 获取当前路由路径
     */
    static getCurrentRoutePath(): string {
        // const router: Router = router()
        return router?.currentRoute?.value?.path as unknown as string
    }

    /**
     * 获取当前路由标题
     */
    static getCurrentRouteMetaTitle(): string {

        return router?.currentRoute?.value?.meta?.title as unknown as string
    }
}