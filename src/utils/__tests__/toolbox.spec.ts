import { describe, it, expect } from 'vitest'
import router from '@/router'
import toolbox from '../toolbox'
import { mount, BaseWrapper } from '@vue/test-utils'
import App from '@/App.vue'

describe('toolbox', async () => {
    const wrapper = mount(
        App,
        {
            global: { plugins: [router] }
        }
    )
    await wrapper.vm.$nextTick()

    it("test is getCurrentRoutePath function", async () => {

        await router.push({ path: '/dashboard' })

        const path: string = toolbox.getCurrentRoutePath()
        expect(path).toContain('/dashboard')
    })

    it('test is getCurrentRouteMetaTitle function', async () => {
        await router.push({ path: '/dashboard' })
        const title: string = toolbox.getCurrentRouteMetaTitle()
        expect(title).toContain('仪表盘')
    })
})