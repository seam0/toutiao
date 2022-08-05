// 封装三个方法，专门用于操作token
const key = 'HEIMATOUTIAO'
// 存
export const setToken = (token) => {
  localStorage.setItem(key, token)
}

// 取
export const getToken = () => localStorage.getItem(key)

// 删
export const removeToken = () => localStorage.removeItem(key)
