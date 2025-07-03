import ky_http from "@/utils/ky_http";
import type { ResponsePromise } from 'ky'


export class SettingsApi {
    static GetSettings(): ResponsePromise<SysSettingsResponse> {
        return ky_http.get<ResponsePromise<SysSettingsResponse>>('sys/get_sys_settings')

    }
    static SaveSettings(data: SysSettingsSubmitDataItem[]) {
        return ky_http.post('sys/update_sys_settings', {
            json: data,
        })
    }
}