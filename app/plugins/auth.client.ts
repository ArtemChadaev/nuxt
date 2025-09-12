// app/plugins/auth.client.ts
export default defineNuxtPlugin(async () => {
    const authStore = useAuthStore();

    // Проверяем, есть ли refreshToken, но нет accessToken
    // Это типичная ситуация после перезагрузки страницы
    if (authStore.refreshToken) {
        // Запускаем действие для получения новых токенов и данных пользователя
        await authStore.newTokens();
    }
});