import { defineStore } from 'pinia'

export type AccountType = 'LDAP' | 'Локальная'

export interface Account {
  id: string
  labels: { text: string }[]
  type: AccountType
  login: string
  password: string | null
}

function loadFromLocalStorage(): Account[] {
  try {
    const data = localStorage.getItem('accounts')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: loadFromLocalStorage() as Account[],
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        id: crypto.randomUUID(),
        labels: [],
        type: 'Локальная',
        login: '',
        password: '',
      })
      this.save()
    },
    updateAccount(updated: Account) {
      const index = this.accounts.findIndex(acc => acc.id === updated.id)
      if (index !== -1) {
        this.accounts[index] = updated
        this.save()
      }
    },
    deleteAccount(id: string) {
      this.accounts = this.accounts.filter(acc => acc.id !== id)
      this.save()
    },
    save() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
    },
  },
})
