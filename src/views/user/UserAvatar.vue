<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userUpateAvatarService } from '@/api/user'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
const imageUrl = ref(userStore.user.user_pic)
const UploadRef = ref()
const onUploadFile = (uploadFile) => {
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}
const uploadImage = async () => {
  await userUpateAvatarService(imageUrl.value)
  await userStore.getUser()
  ElMessage.success('上传成功')
}
</script>

<template>
  <page-container title="更换头像">
    <template #default>
      <el-upload
        ref="UploadRef"
        class="avatar-uploader"
        :show-file-list="false"
        :auto-upload="false"
        :on-change="onUploadFile"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <br />
      <el-button
        @click="UploadRef.$el.querySelector('input').click()"
        type="primary"
        :icon="Plus"
        size="large"
        >选择图片</el-button
      >
      <el-button @click="uploadImage" type="success" :icon="Upload" size="large"
        >上传头像</el-button
      >
    </template>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
