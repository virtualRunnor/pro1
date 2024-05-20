<script setup>
import { ref } from 'vue'
import { artGetChannelsService } from '@/api/article'
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
const emit = defineEmits(['update:modelValue'])
getChannelList()
defineProps({
  modelValue: {
    type: [Number || String]
  },
  width: {
    type: String
  }
})
</script>

<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
