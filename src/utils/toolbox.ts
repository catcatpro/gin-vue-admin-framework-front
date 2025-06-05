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

    static Object2UrlencodedData(originData: Object) {
        const encodeData = new URLSearchParams()
        for (const [key, value] of Object.entries(originData))
            encodeData.append(key, value as string)
        return encodeData.toString()
    }

    

}