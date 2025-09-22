export const sampleCode = `<template>
  <div class="user-profile">
    <h1>用戶資料</h1>
    <UserCard 
      :user="currentUser" 
      @edit="editUser"
      @delete="deleteUser"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserCard from './components/UserCard.vue'

interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

const currentUser = ref<User | null>(null)
const editUser = (user: User) => console.log('編輯用戶:', user)
const deleteUser = (userId: number) => console.log('刪除用戶:', userId)

onMounted(async () => {
  try {
    const response = await fetch('/api/user/current')
    currentUser.value = await response.json()
  } catch (error) {
    console.error('載入用戶資料失敗:', error)
  }
})
</script>`

export const sampleInsertCode = `<template>
  <div class="component">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '預設描述'
})
</script>

<style lang="postcss" scoped>
.component {
  @apply p-4 border rounded-lg;
}
</style>`
