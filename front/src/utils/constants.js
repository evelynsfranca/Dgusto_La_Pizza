export const API_URL = process.env.API_URL ?? "http://localhost:8080/api"
export const API_LOGIN_URL = process.env.API_LOGIN_URL ?? "http://localhost:8080/api/auth/login"

export const userAuthorities = [ 'ROLE_ADMIN', 'ROLE_USER',  'ROLE_EMPLOYEE',  'ROLE_CLIENT']

export const phoneTypes = { CELLPHONE: 'CELULAR', LANDLINE: 'FIXO' }

export const paymentMethods = { 
  CREDIT_CARD: 'CRÉDITO',
  DEBIT_CARD: 'DÉBITO',
  CASH: 'DINHEIRO'
}