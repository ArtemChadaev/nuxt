// Тип ответа от API
interface AuthResponse {
  accessToken: string
  refreshToken: string
}

export default async function login(email: string, password: string) {}
