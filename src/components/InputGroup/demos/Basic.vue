<template>
  <div class="flex flex-col gap-4 p-4 max-w-lg">
    <!-- Text prefix addon -->
    <SHInputGroup>
      <SHInputGroupAddon>https://</SHInputGroupAddon>
      <SHInput v-model="url" placeholder="example.com" />
    </SHInputGroup>

    <!-- Text suffix addon -->
    <SHInputGroup>
      <SHInput v-model="email" placeholder="username" />
      <SHInputGroupAddon>@example.com</SHInputGroupAddon>
    </SHInputGroup>

    <!-- Prefix + suffix addons -->
    <SHInputGroup>
      <SHInputGroupAddon>$</SHInputGroupAddon>
      <SHInput v-model="price" placeholder="0.00" />
      <SHInputGroupAddon>USD</SHInputGroupAddon>
    </SHInputGroup>

    <!-- Input + Button (search bar) -->
    <SHInputGroup>
      <SHInput v-model="search" placeholder="Search..." />
      <SHButton type="primary">Search</SHButton>
    </SHInputGroup>

    <!-- Icon addon -->
    <SHInputGroup>
      <SHInputGroupAddon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </SHInputGroupAddon>
      <SHInput v-model="search2" placeholder="Search by keyword..." />
    </SHInputGroup>

    <!-- Input + block-end footer addon -->
    <SHInputGroup>
      <SHInput v-model="amount" placeholder="Enter amount" />
      <SHInputGroupAddon align="block-end">USD</SHInputGroupAddon>
    </SHInputGroup>

    <!-- Textarea + block-end footer with count + button -->
    <SHInputGroup>
      <SHTextarea
        v-model:value="comment"
        placeholder="Write a comment..."
        :maxlength="280"
        :rows="3"
        resize="none"
      />
      <SHInputGroupAddon align="block-end">
        <span>{{ comment.length }}/280</span>
        <SHButton type="primary" style="margin-left: auto">Post</SHButton>
      </SHInputGroupAddon>
    </SHInputGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHInputGroup from '../index.vue'
import SHInputGroupAddon from '../InputGroupAddon.vue'
import SHInput from '@/components/Input/index.vue'
import SHTextarea from '@/components/Textarea/index.vue'
import SHButton from '@/components/Button/index.vue'

const url = ref('')
const email = ref('')
const price = ref('')
const search = ref('')
const search2 = ref('')
const amount = ref('')
const comment = ref('')
</script>
