export const getUser = () => {
  const users = JSON.parse(localStorage.getItem('users'))
  return users?.find((u) => u.login)
}

export const loggedUser = () => {
  if ('user' in localStorage) {
    return JSON.parse(localStorage.getItem('user'))
  }

  return false
}

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
}
