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
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  sys_name: '',
  sys_switch: false,
})

const onSubmit = () => {
  console.log('submit!')
}
</script>
