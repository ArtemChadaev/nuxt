// app/plugins/axiosApi.ts
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    // Получаем runtime-конфигурацию
    const config = useRuntimeConfig();

    // Создаем экземпляр axios с базовой конфигурацией
    const api = axios.create({
        baseURL: config.public.apiBase + 'api/',
        headers: {
            common: {
                "Content-Type": "application/json",
            },
        },
    });

    // Используем интерцептор для добавления токена авторизации в каждый запрос
    api.interceptors.request.use((config) => {
        const authStore = useAuthStore();

        config.headers.Authorization = `Bearer ${authStore.accessToken}`;
        return config;
    });

    // Предоставляем настроенный экземпляр всему приложению
    return {
        provide: {
            axios: api,
        },
    };
});