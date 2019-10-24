import t from 'tcomb-form'

export const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ //or any other regexp
  return reg.test(email)
})

export const Password = t.refinement(t.String, password => {
  const reg = /^.{6,}$/ //or any other regexp
  return reg.test(password)
})
