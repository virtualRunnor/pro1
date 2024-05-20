<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'
import { ElMessage } from 'element-plus'
const formRef = ref()
const {
  user: { id, email, nickname, username },
  getUser
} = useUserStore()
const formData = ref({
  username,
  nickname,
  email,
  id
})
const formRules = ref({
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: ['blur', 'change']
    }
  ]
})

const submitForm = async () => {
  await formRef.value.validate()
  await userUpdateInfoService(formData.value)
  getUser()
  ElMessage.success('更新成功')
}
</script>

<template>
  <page-container title="基本资料">
    <template #default>
      <el-form
        :model="formData"
        :rules="formRules"
        ref="formRef"
        label-width="100px"
        size="large"
        style="max-width: 800px"
      >
        <el-form-item label="登录名称">
          <el-input v-model="formData.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="formData.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交修改</el-button>
        </el-form-item>
      </el-form>
    </template>
  </page-container>
</template>
