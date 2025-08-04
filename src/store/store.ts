import { defineStore } from 'pinia'
import { useLocalStorage } from '../utils/useLocalStorage'

export type AccountType = 'LDAP' | 'Локальная'

export interface Account {
  id: string
  labels: { text: string }[]
  type: AccountType
  login: string
  password: string | null
}

export const useAccountsStore = defineStore('accounts', {
  state: () => {
    const { load, save } = useLocalStorage<Account[]>('accounts', [])
    return {
      accounts: load(),
      storage: { load, save }, 
    }
  },
  actions: {
    addAccount() {
      this.accounts.push({
        id: crypto.randomUUID(),
        labels: [],
        type: 'Локальная',
        login: '',
        password: '',
      })
      this.storage.save(this.accounts)
    },
    updateAccount(updated: Account) {
      const index = this.accounts.findIndex(acc => acc.id === updated.id)
      if (index !== -1) {
        this.accounts[index] = updated
        this.storage.save(this.accounts)
      }
    },
    deleteAccount(id: string) {
      this.accounts = this.accounts.filter(acc => acc.id !== id)
      this.storage.save(this.accounts)
    },
  },
})
