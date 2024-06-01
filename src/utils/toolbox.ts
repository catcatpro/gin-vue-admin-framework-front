import { useRoute, useRouter } from 'vue-router'
import type { Router } from 'vue-router'
export default class toolbox {

    /**
     * 获取当前路由路径
     */
    static getCurrentRoutePath(): string {
        const router: Router = useRouter()
        return router?.currentRoute?.value?.path as unknown as string
    }

    /**
     * 获取当前路由标题
     */
    static getCurrentRouteMetaTitle(): string {
        const router: Router = useRouter()
        console.log(router.currentRoute.value)
        return router?.currentRoute?.value?.meta as unknown as string
    }
}