<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  SHConfigProvider,
  SHFlexContainer,
  SHBorderContainer,
  SHButton,
  SHInput,
  SHSwitch,
  SHBadge,
  SHSplitter,
  SHSplitterGroup,
  SHSplitterPanel,
  SHSplitterResizeHandle,
  SHActiveButtonGroup,
  SHActiveButtonItem,
  SHProgress,
  SHSpin,
  SHSelect,
  SHCheckbox,
  SHCheckboxGroup,
  SHRadio,
  SHRadioGroup,
  SHDatePicker,
  SHTimePicker,
  SHDateTimePicker,
  SHCalendar,
  SHPagination,
  SHChip,
  SHTag,
  SHCollapsible,
  SHScrollArea,
  SHDialog,
  SHMessageBox,
  SHNotification,
  SHMentionableTextArea,
  SHTextarea,
  SHSlider,
  SHContextMenu,
  SHTooltip,
  SHPopover,
  SHDivider,
  SHBlockArea,
  SHEditableContainer,
  SHCarousel,
  SHCarouselItem,
  SHCarouselNavigation,
  SHCarouselIndicators,
} from '../../index'

const theme = ref('light')
const activeTab = ref('dashboard')
const searchText = ref('')
const isLoading = ref(false)
const showDialog = ref(false)

// Form data
const formData = ref({
  name: 'John Doe',
  role: 'admin',
  notifications: ['email'],
  themeMode: 'system',
  scheduleDate: null,
  scheduleTime: null,
  startDateTime: null,
  bio: '',
  sliderVal: 30,
  mentionContent: 'Hello @user',
})

const items = ref(
  Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    status: i % 3 === 0 ? 'Active' : 'Inactive',
    date: '2024-02-18',
  })),
)
const currentPage = ref(1)

const filteredItems = computed(() => {
  return items.value.slice((currentPage.value - 1) * 5, currentPage.value * 5)
})

const handleSave = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    SHNotification.success('Settings saved successfully!')
  }, 1500)
}

const toggleTheme = (val: boolean) => {
  theme.value = val ? 'dark' : 'light'
}

const carouselImages = [
  'https://picsum.photos/400/200?random=1',
  'https://picsum.photos/400/200?random=2',
  'https://picsum.photos/400/200?random=3',
]
</script>

<template>
  <SHConfigProvider :theme="theme">
    <div class="text-text.base">
      <!-- Top Bar -->
      <SHBorderContainer :hover="false">
        <SHFlexContainer justify="space-between" align="center">
          <SHFlexContainer gap="16px" align="center">
            <div class="text-xl font-bold text-primary">Shelter UI</div>
            <SHInput
              v-model="searchText"
              placeholder="Search..."
              width="250px"
            />
          </SHFlexContainer>

          <SHFlexContainer gap="16px" align="center">
            <SHSwitch
              v-model="theme"
              label="Dark Mode"
              @update:model-value="toggleTheme"
            />

            <SHPopover trigger="click">
              <template #trigger>
                <SHBadge :value="3" type="danger">
                  <SHButton type="text">Notifications</SHButton>
                </SHBadge>
              </template>
              <div class="p-4 w-64 border border.base rounded shadow-lg">
                <div class="text-sm font-bold mb-2">Recent Alerts</div>
                <div
                  class="text-xs text-text.base.fade mb-2 p-2 hover:bg-bg.secondary rounded cursor-pointer"
                >
                  System update completed
                </div>
                <div
                  class="text-xs text-text.base.fade mb-2 p-2 hover:bg-bg.secondary rounded cursor-pointer"
                >
                  New user registration
                </div>
                <SHDivider />
                <SHButton size="small" block type="text">View All</SHButton>
              </div>
            </SHPopover>

            <SHTooltip content="Manage your profile">
              <SHButton type="primary">Profile</SHButton>
            </SHTooltip>
          </SHFlexContainer>
        </SHFlexContainer>
      </SHBorderContainer>

      <!-- Main Layout -->
      <div class="flex-1 overflow-hidden flex">
        <SHSplitterGroup direction="horizontal">
          <!-- Sidebar -->
          <SHSplitterPanel
            :min-size="15"
            :default-size="20"
            :max-size="30"
            class="border-r border-border.base flex flex-col"
          >
            <SHScrollArea class="h-full">
              <div class="p-4">
                <SHActiveButtonGroup
                  v-model="activeTab"
                  direction="vertical"
                  class="w-full"
                >
                  <SHActiveButtonItem value="dashboard" label="Dashboard" />
                  <SHActiveButtonItem value="users" label="Users & Data" />
                  <SHActiveButtonItem value="content" label="Content & Media" />
                  <SHActiveButtonItem value="settings" label="Settings" />
                </SHActiveButtonGroup>

                <SHDivider class="my-6" />

                <div class="mb-6">
                  <div
                    class="text-xs font-semibold uppercase text-text.base.fade mb-2 px-2"
                  >
                    Quick Actions
                  </div>
                  <SHFlexContainer direction="column" gap="8px">
                    <SHButton block @click="showDialog = true"
                      >Show Dialog</SHButton
                    >
                    <SHButton
                      block
                      @click="SHMessageBox.alert('This is an alert message')"
                      >Show Alert</SHButton
                    >
                  </SHFlexContainer>
                </div>

                <SHCollapsible title="System Status" :default-open="true">
                  <div class="p-3 text-sm rounded border border.base">
                    <div class="flex justify-between mb-1">
                      <span>CPU Usage</span> <span class="font-mono">45%</span>
                    </div>
                    <SHProgress :percentage="45" :stroke-width="6" />
                    <div class="flex justify-between mt-3 mb-1">
                      <span>Memory</span> <span class="font-mono">72%</span>
                    </div>
                    <SHProgress
                      :percentage="72"
                      status="warning"
                      :stroke-width="6"
                    />
                    <div class="flex justify-between mt-3 mb-1">
                      <span>Storage</span> <span class="font-mono">89%</span>
                    </div>
                    <SHProgress
                      :percentage="89"
                      status="danger"
                      :stroke-width="6"
                    />
                  </div>
                </SHCollapsible>
              </div>
            </SHScrollArea>
          </SHSplitterPanel>

          <SHSplitterResizeHandle />

          <!-- Content Area -->
          <SHSplitterPanel :min-size="40" class="relative">
            <SHScrollArea class="h-full">
              <div class="p-6 max-w-7xl mx-auto">
                <!-- Dashboard Tab -->
                <div v-if="activeTab === 'dashboard'" class="space-y-6">
                  <div class="flex justify-between items-end">
                    <div>
                      <h2 class="text-2xl font-bold">Dashboard Overview</h2>
                      <p class="text-text.base.fade">
                        Global analytics and reporting
                      </p>
                    </div>
                    <SHDateTimePicker
                      v-model="formData.startDateTime"
                      placeholder="Filter range..."
                    />
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SHBorderContainer class="p-5" hover>
                      <div class="text-text.base.fade text-sm font-medium">
                        Total Revenue
                      </div>
                      <div class="text-3xl font-bold mt-2 text-text.primary">
                        $45,231.89
                      </div>
                      <div class="mt-3 flex items-center gap-2">
                        <SHTag type="success" size="small">+20.1%</SHTag>
                        <span class="text-xs text-text.base.fade"
                          >vs last month</span
                        >
                      </div>
                    </SHBorderContainer>
                    <SHBorderContainer class="p-5" hover>
                      <div class="text-text.base.fade text-sm font-medium">
                        Active Users
                      </div>
                      <div class="text-3xl font-bold mt-2 text-text.primary">
                        2,350
                      </div>
                      <div class="mt-3 flex items-center gap-2">
                        <SHTag type="warning" size="small">+180</SHTag>
                        <span class="text-xs text-text.base.fade"
                          >new this week</span
                        >
                      </div>
                    </SHBorderContainer>
                    <SHBorderContainer class="p-5" hover>
                      <div class="text-text.base.fade text-sm font-medium">
                        Avg. Response Time
                      </div>
                      <div class="text-3xl font-bold mt-2 text-text.primary">
                        124ms
                      </div>
                      <div class="mt-3 flex items-center gap-2">
                        <SHTag type="primary" size="small">-12ms</SHTag>
                        <span class="text-xs text-text.base.fade"
                          >improvement</span
                        >
                      </div>
                    </SHBorderContainer>
                  </div>

                  <SHFlexContainer class="mt-8" gap="24px">
                    <div class="flex-1 space-y-4">
                      <h3 class="text-lg font-bold">Recent Activity</h3>
                      <div class="space-y-3">
                        <div
                          v-for="i in 4"
                          :key="i"
                          class="flex items-center justify-between p-4 rounded-lg border border.base"
                        >
                          <div class="flex items-center gap-4">
                            <div
                              class="w-10 h-10 rounded-full flex items-center justify-center text-primary font-bold"
                            >
                              U{{ i }}
                            </div>
                            <div>
                              <div class="font-medium text-sm">
                                User Action performed on Project {{ i }}
                              </div>
                              <div class="text-xs text-text.base.fade">
                                2 minutes ago
                              </div>
                            </div>
                          </div>
                          <SHChip color="blue" variant="outline"
                            >Completed</SHChip
                          >
                        </div>
                      </div>
                    </div>
                    <div class="w-full md:w-1/3 space-y-4">
                      <h3 class="text-lg font-bold">Server Load</h3>
                      <SHBorderContainer
                        class="p-6 text-center h-full flex flex-col items-center justify-center"
                      >
                        <SHSpin :spinning="isLoading">
                          <div
                            class="relative w-40 h-40 mx-auto mb-6 rounded-full border-8 border-dashed border-primary.fade flex items-center justify-center"
                          >
                            <div class="text-center">
                              <span class="text-4xl font-bold block">75%</span>
                              <span class="text-xs text-text.base.fade"
                                >CPU LOAD</span
                              >
                            </div>
                          </div>
                        </SHSpin>
                        <p class="text-text.base.fade mb-6 text-sm">
                          Running optimally. No issues detected.
                        </p>
                        <SHButton
                          block
                          @click="isLoading = !isLoading"
                          variant="outline"
                          >{{ isLoading ? 'Stop' : 'Refresh Data' }}</SHButton
                        >
                      </SHBorderContainer>
                    </div>
                  </SHFlexContainer>
                </div>

                <!-- Users / Data / Calendar Tab -->
                <div v-else-if="activeTab === 'users'" class="space-y-6">
                  <SHFlexContainer justify="space-between" align="center">
                    <div>
                      <h2 class="text-2xl font-bold mb-1">User Management</h2>
                      <p class="text-text.base.fade">
                        Manage access and permissions
                      </p>
                    </div>
                    <div class="flex gap-2">
                      <SHButton>Export</SHButton>
                      <SHButton type="primary">Add User</SHButton>
                    </div>
                  </SHFlexContainer>

                  <div
                    class="border border.base rounded-lg overflow-hidden shadow-sm"
                  >
                    <div
                      class="grid grid-cols-4 bg-bg.secondary p-4 font-semibold text-sm border-b border.base"
                    >
                      <div>Name / Email</div>
                      <div>Status</div>
                      <div>Role</div>
                      <div class="text-right">Actions</div>
                    </div>
                    <div
                      v-for="item in filteredItems"
                      :key="item.id"
                      class="grid grid-cols-4 p-4 border-b border.base hover:bg-bg.secondary items-center transition-colors"
                    >
                      <div>
                        <div class="font-medium">{{ item.name }}</div>
                        <div class="text-xs text-text.base.fade">
                          user{{ item.id }}@example.com
                        </div>
                      </div>
                      <div>
                        <SHBadge
                          :type="
                            item.status === 'Active' ? 'success' : 'warning'
                          "
                          is-dot
                        />
                        <span class="ml-2 text-sm">{{ item.status }}</span>
                      </div>
                      <div>
                        <SHTag size="small">Editor</SHTag>
                      </div>
                      <div
                        class="text-right flex justify-end items-center gap-2"
                      >
                        <SHButton size="small" variant="outline">Edit</SHButton>
                        <SHContextMenu>
                          <SHButton size="small" type="text" icon="..."
                            >More</SHButton
                          >
                          <template #content>
                            <div
                              class="p-1 w-32 border border.base rounded shadow-lg"
                            >
                              <div
                                class="px-3 py-2 text-sm hover:bg-bg.secondary cursor-pointer rounded"
                              >
                                Details
                              </div>
                              <div
                                class="px-3 py-2 text-sm hover:bg-bg.secondary cursor-pointer rounded text-status.danger"
                              >
                                Delete
                              </div>
                            </div>
                          </template>
                        </SHContextMenu>
                      </div>
                    </div>
                    <div class="p-4 border-t border.base flex justify-center">
                      <SHPagination
                        v-model="currentPage"
                        :total="items.length"
                        :page-size="5"
                      />
                    </div>
                  </div>

                  <SHDivider class="my-8" />

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 class="text-lg font-bold mb-4">Team Schedule</h3>
                      <SHCalendar class="border border.base rounded-lg p-4" />
                    </div>
                    <div>
                      <h3 class="text-lg font-bold mb-4">Quick User Edit</h3>
                      <SHEditableContainer
                        v-model="formData.name"
                        class="p-4 border border.base rounded mb-4"
                      >
                        <template #edit-icon>✎</template>
                      </SHEditableContainer>
                      <p class="text-sm text-text.base.fade">
                        Click above to edit user name directly using
                        EditableContainer.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Content & Media Tab -->
                <div v-else-if="activeTab === 'content'" class="space-y-6">
                  <h2 class="text-2xl font-bold mb-6">Media Gallery</h2>

                  <div class="bg-bg.secondary rounded-lg p-6 mb-8">
                    <h3 class="text-lg font-bold mb-4">Featured Carousel</h3>
                    <SHCarousel
                      class="aspect-video w-full rounded-lg overflow-hidden shadow-lg bg-bg.secondary"
                    >
                      <SHCarouselItem
                        v-for="(img, idx) in carouselImages"
                        :key="idx"
                      >
                        <div
                          class="w-full h-full flex items-center justify-center bg-bg.secondary.darken text-text.base.fade font-bold text-xl"
                        >
                          Slide {{ idx + 1 }}
                        </div>
                      </SHCarouselItem>
                      <SHCarouselNavigation />
                      <SHCarouselIndicators />
                    </SHCarousel>
                  </div>

                  <div class="grid grid-cols-1 gap-6">
                    <h3 class="text-lg font-bold">Draft Content</h3>
                    <SHMentionableTextArea
                      v-model="formData.mentionContent"
                      :mentions="
                        items.map((i) => ({ label: i.name, value: i.id }))
                      "
                      placeholder="Type @ to mention users..."
                      class="min-h-[150px]"
                    />
                    <div class="mt-2 text-xs text-text.base.fade">
                      Try typing '@' to see mention list.
                    </div>
                  </div>
                </div>

                <!-- Settings Tab -->
                <div v-else-if="activeTab === 'settings'" class="max-w-3xl">
                  <h2 class="text-2xl font-bold mb-6 border-b border.base pb-4">
                    System Settings
                  </h2>

                  <SHBlockArea :blocked="isLoading" tip="Saving changes...">
                    <div class="space-y-8">
                      <!-- Profile Section -->
                      <div>
                        <h3 class="text-lg font-semibold mb-4">
                          Profile Information
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SHFlexContainer direction="column" gap="8px">
                            <label class="text-sm font-medium"
                              >Display Name</label
                            >
                            <SHInput v-model="formData.name" />
                          </SHFlexContainer>

                          <SHFlexContainer direction="column" gap="8px">
                            <label class="text-sm font-medium">Role</label>
                            <SHSelect
                              v-model="formData.role"
                              :options="[
                                { label: 'Administrator', value: 'admin' },
                                { label: 'User', value: 'user' },
                                { label: 'Guest', value: 'guest' },
                              ]"
                            />
                          </SHFlexContainer>
                        </div>

                        <SHFlexContainer
                          direction="column"
                          gap="8px"
                          class="mt-4"
                        >
                          <label class="text-sm font-medium">Bio</label>
                          <SHTextarea
                            v-model="formData.bio"
                            :rows="3"
                            placeholder="Tell something about yourself"
                          />
                        </SHFlexContainer>
                      </div>

                      <SHDivider />

                      <!-- Preferences -->
                      <div>
                        <h3 class="text-lg font-semibold mb-4">Preferences</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SHFlexContainer direction="column" gap="8px">
                            <label class="text-sm font-medium"
                              >Default Date</label
                            >
                            <SHDatePicker v-model="formData.scheduleDate" />
                          </SHFlexContainer>
                          <SHFlexContainer direction="column" gap="8px">
                            <label class="text-sm font-medium"
                              >Default Time</label
                            >
                            <SHTimePicker v-model="formData.scheduleTime" />
                          </SHFlexContainer>
                        </div>

                        <div class="mt-6">
                          <label class="block mb-2 text-sm font-medium"
                            >Notification Channels</label
                          >
                          <SHCheckboxGroup v-model="formData.notifications">
                            <SHCheckbox
                              label="Email Notifications"
                              value="email"
                            />
                            <SHCheckbox label="SMS Alerts" value="sms" />
                            <SHCheckbox
                              label="Push Notifications"
                              value="push"
                            />
                          </SHCheckboxGroup>
                        </div>

                        <div class="mt-6">
                          <label class="block mb-2 text-sm font-medium"
                            >System Role (Radio)</label
                          >
                          <SHRadioGroup v-model="formData.role">
                            <SHRadio label="Admin" value="admin" />
                            <SHRadio label="Standard User" value="user" />
                          </SHRadioGroup>
                        </div>

                        <div class="mt-6">
                          <label class="block mb-2 text-sm font-medium"
                            >Audio Volume: {{ formData.sliderVal }}%</label
                          >
                          <SHSlider v-model="formData.sliderVal" />
                        </div>
                      </div>

                      <SHDivider />

                      <SHFlexContainer justify="flex-end" gap="12px">
                        <SHButton variant="outline">Reset</SHButton>
                        <SHButton
                          type="primary"
                          :loading="isLoading"
                          @click="handleSave"
                          >Save Changes</SHButton
                        >
                      </SHFlexContainer>
                    </div>
                  </SHBlockArea>
                </div>
              </div>
            </SHScrollArea>
          </SHSplitterPanel>
        </SHSplitterGroup>
      </div>
    </div>

    <!-- Dialog -->
    <SHDialog v-model="showDialog" title="Wait a second!">
      This is a dialog component demo. You can put any content here.
      <template #footer>
        <SHButton @click="showDialog = false">Close</SHButton>
        <SHButton type="primary" @click="showDialog = false">Confirm</SHButton>
      </template>
    </SHDialog>
  </SHConfigProvider>
</template>
