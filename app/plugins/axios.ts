import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    // Получаем runtime-конфигурацию
    const config = useRuntimeConfig();

    // Создаем экземпляр axios с базовой конфигурацией
    const auth = axios.create({
        baseURL: config.public.apiBase + 'auth/',
        headers: {
            common: {
                "Content-Type": "application/json",
            },
        },
    });

    // Предоставляем настроенный экземпляр всему приложению
    return {
        provide: {
            auth: auth,
        },
    };
});