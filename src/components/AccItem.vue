<script setup lang="ts">
import { ref, watch, } from 'vue'
import { parseLabels } from '../utils/labelParser'
import type { Account } from '../store/store'
import { useAccountsStore } from '../store/store'

const props = defineProps<{
  account: Account
}>()

const store = useAccountsStore()

const labelsInput = ref(props.account.labels.map(l => l.text).join(';'))
const login = ref(props.account.login)
const password = ref(props.account.password ?? '')
const type = ref(props.account.type)

const errors = ref({
  login: false,
  password: false,
})

const validateAndSave = () => {
  errors.value.login = !login.value || login.value.length > 100
  errors.value.password = type.value === 'Локальная' && (!password.value || password.value.length > 100)

  if (!errors.value.login && !errors.value.password) {
    const updated: Account = {
      id: props.account.id,
      type: type.value,
      login: login.value,
      password: type.value === 'LDAP' ? null : password.value,
      labels: parseLabels(labelsInput.value),
    }
    store.updateAccount(updated)
  }
}

watch([labelsInput, login, password, type], validateAndSave, { deep: true })
</script>

<template>
  <div class="flex items-center p-2 gap-2">
    <input v-model="labelsInput" placeholder="Метки (через ;)" class="w-full p-2 border rounded" />
    <select v-model="type" class="w-full p-2 border rounded">
      <option value="LDAP">LDAP</option>
      <option value="Локальная">Локальная</option>
    </select>
    <input v-model="login" placeholder="Логин"
      :class="['w-full p-2 border rounded', { 'border-red-500': errors.login }]" />
    <input v-if="type === 'Локальная'" v-model="password" placeholder="Пароль" type="password"
      :class="['w-full p-2 border rounded', { 'border-red-500': errors.password }]" />
    <button class="text-red-600 hover:underline" @click="store.deleteAccount(account.id)">
      Удалить
    </button>
  </div>
</template>
