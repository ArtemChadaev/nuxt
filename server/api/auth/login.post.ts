import { defineEventHandler, readBody, createError } from "h3";

function generateToken() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { email, password } = body;

  // Заглушка для проверки учетных данных
  if (email != null && password != null) {
    const token = generateToken();
    const name = email.split("@")[0];
    const id = 1;
    return {
      token,
      user: {
        name,
        id,
      },
    };
  }

  // Если учетные данные неверны
  throw createError({
    statusCode: 401,
    statusMessage: "Invalid email or password",
  });
});
