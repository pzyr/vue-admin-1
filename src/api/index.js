import http from "@/utils/request";

export const getData = () => {
  return http.get('/home/getData')
}

export const getTableData = (params) => {
  return http.get('/Student(FY)',params)
}

export const addUser = (data) => {
  return http.post('/Student',data)
}

export const editUser = (data) => {
  return http.put('/Student',data)
}

export const delUser = (params) => {
  return http.delete('/Student',params)
}

export const delUser2 = (data) => {
  return http.delete('/Student(PL)',data)
}

export const getLogin = (params) => {
  return http.get('/Logins',params)
}

export const getLogin1 = (params) => {
  return http.get('/Login1',params)
}

export const addRegister = (data) => {
  return http.post('/Login',data)
}