<script setup>
import { ref } from 'vue'
import { artGetChannelsService, artDelChannelService } from '@/api/article.js'
import { Delete, Edit } from '@element-plus/icons-vue'
import channelEdit from './components/channelEdit.vue'
import { ElMessage } from 'element-plus'

//页面渲染
const loading = ref(false)
const channelList = ref([])
const dialog = ref()
const getChannelList = async () => {
  //配置loading效果
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()

//编剧以及删除处理
const onEditorChannel = (row) => {
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认要删除该分类么？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}
const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"> 添加分类 </el-button>
    </template>
    <el-table
      v-loading="loading"
      element-loading-text="Loading..."
      :data="channelList"
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" width="100" label="序号"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditorChannel(row, $index)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <channelEdit ref="dialog" @success="onSuccess"></channelEdit>
  </page-container>
</template>

<style>
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
