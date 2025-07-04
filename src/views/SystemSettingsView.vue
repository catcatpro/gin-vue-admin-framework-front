<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="系统名称">
      <el-input v-model="form.sys_name" placeholder="请输入系统名称" />
    </el-form-item>
    <!--    <el-form-item label="Activity zone">-->
    <!--      <el-select v-model="form.region" placeholder="please select your zone">-->
    <!--        <el-option label="Zone one" value="shanghai" />-->
    <!--        <el-option label="Zone two" value="beijing" />-->
    <!--      </el-select>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item label="Activity time">-->
    <!--      <el-col :span="11">-->
    <!--        <el-date-picker-->
    <!--          v-model="form.date1"-->
    <!--          type="date"-->
    <!--          placeholder="Pick a date"-->
    <!--          style="width: 100%"-->
    <!--        />-->
    <!--      </el-col>-->
    <!--      <el-col :span="2" class="text-center">-->
    <!--        <span class="text-gray-500">-</span>-->
    <!--      </el-col>-->
    <!--      <el-col :span="11">-->
    <!--        <el-time-picker-->
    <!--          v-model="form.date2"-->
    <!--          placeholder="Pick a time"-->
    <!--          style="width: 100%"-->
    <!--        />-->
    <!--      </el-col>-->
    <!--    </el-form-item>-->
    <el-form-item label="系统开关">
      <el-switch v-model="form.sys_switch" />
    </el-form-item>
    <!--    <el-form-item label="Activity type">-->
    <!--      <el-checkbox-group v-model="form.type">-->
    <!--        <el-checkbox value="Online activities" name="type">-->
    <!--          Online activities-->
    <!--        </el-checkbox>-->
    <!--        <el-checkbox value="Promotion activities" name="type">-->
    <!--          Promotion activities-->
    <!--        </el-checkbox>-->
    <!--        <el-checkbox value="Offline activities" name="type">-->
    <!--          Offline activities-->
    <!--        </el-checkbox>-->
    <!--        <el-checkbox value="Simple brand exposure" name="type">-->
    <!--          Simple brand exposure-->
    <!--        </el-checkbox>-->
    <!--      </el-checkbox-group>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item label="Resources">-->
    <!--      <el-radio-group v-model="form.resource">-->
    <!--        <el-radio value="Sponsor">Sponsor</el-radio>-->
    <!--        <el-radio value="Venue">Venue</el-radio>-->
    <!--      </el-radio-group>-->
    <!--    </el-form-item>-->
    <!--    <el-form-item label="Activity form">-->
    <!--      <el-input v-model="form.desc" type="textarea" />-->
    <!--    </el-form-item>-->
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { SettingsApi } from '@/api/SettingsApi'
import { HttpStatus } from '@/enums/api'
import { ElMessage } from 'element-plus'
import { reactive, onMounted } from 'vue'

// do not use same name with ref
const form = reactive<SysSettings>({
  sys_name: '',
  sys_switch: false,
})

//保存系统设置
const onSubmit = () => {
  console.log('submit!', Object.keys(form), Object.values(form))
  const submitData: SysSettingsSubmitDataItem[] = []
  const formObjKeys = Object.keys(form)
  const formObjValues = Object.values(form)
  for (let i = 0; i < formObjKeys.length; i++) {
    const currentKey = formObjKeys[i]
    const currentValue = formObjValues[i]
    const temp: SysSettingsSubmitDataItem = {
      set_key: currentKey,
      set_value: `${currentKey == 'sys_switch' ? (currentValue ? 1 : 0) : currentValue}`
    }
    submitData.push(temp)
  }

  console.log('data', submitData)
  SettingsApi.SaveSettings(submitData).then(async res => {
    const resp_res = await res.json() as BasicResponse
    console.log("res.status", resp_res)

    if (resp_res.status === HttpStatus.Success) {
      ElMessage.success("保存成功")
    }
  })
}

//获取系统设置数据
const getSysSettings = async () => {
  const settingsRes = await SettingsApi.GetSettings()
  if (settingsRes.ok) {
    const responseBody = await settingsRes.json() as SysSettingsResponse
    if (responseBody.status != HttpStatus.Success) {
      ElMessage.error(responseBody.msg)
      return
    }

    const responseData = responseBody.data
    for (let i = 0; i < responseData.length; i++) {
      const item = responseData[i]
      //@ts-ignore
      form[item.set_key] = item.set_key == 'sys_switch' ? (item.set_value === '1' ? true : false) : item.set_value
    }

  }
}
onMounted(async () => {
  await getSysSettings()
})
</script>
