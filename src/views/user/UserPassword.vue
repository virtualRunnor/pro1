<script setup>
import { userUpdatePwdService } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const formRef = ref()
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const userStore = useUserStore()
const rules = {
  old_pwd: [
    { required: true, message: '原密码不能为空', trigger: 'blur' },
    { min: 6, max: 15, message: '原密码长度需为6-15位', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === pwdForm.value.new_pwd) {
          callback(new Error('原密码不能与新密码相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  new_pwd: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    { min: 6, max: 15, message: '新密码长度需为6-15位', trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '确认密码不能为空', trigger: 'blur' },
    { min: 6, max: 15, message: '确认密码长度需为6-15位', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== pwdForm.value.new_pwd) {
          callback(new Error('确认密码必须与新密码一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const submitForm = async () => {
  await userUpdatePwdService(pwdForm.value)
  userStore.removeToken()
  userStore.setUser({})
  formRef.value.resetFields()
  ElMessage.success('修改成功')
  router.push('/login')
}

const resetForm = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <page-container title="更换密码">
    <template #default>
      <el-form
        :model="pwdForm"
        :rules="rules"
        ref="formRef"
        label-width="100px"
        style="max-width: 800px"
        size="large"
      >
        <el-form-item label="原密码" prop="old_pwd">
          <el-input
            v-model="pwdForm.old_pwd"
            placeholder="请输入原密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input
            v-model="pwdForm.new_pwd"
            placeholder="请输入新密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="re_pwd">
          <el-input
            v-model="pwdForm.re_pwd"
            placeholder="请确认新密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('pwdForm')"
            >修改密码</el-button
          >
          <el-button @click="resetForm('pwdForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </page-container>
</template>
