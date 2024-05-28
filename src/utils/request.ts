import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    CancelTokenSource,
    InternalAxiosRequestConfig
} from 'axios';

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
    retry?: number; // 尝试重试的次数
    retryDelay?: number; // 重试的延迟时间
}

interface LoadingHandler {
    start: () => void;
    end: () => void;
}

// 基础配置
const config = {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10)
};

// 创建axios实例
const instance: AxiosInstance = axios.create({
    baseURL: config.BASE_URL,
    timeout: config.TIMEOUT,
    withCredentials: true // 允许携带cookie
});

// 全局loading默认处理
const defaultLoadingHandler: LoadingHandler = {
    start: () => console.log('Loading started...'),
    end: () => console.log('Loading ended...')
};

// 全局loading处理
let loadingHandler: LoadingHandler = defaultLoadingHandler;

// 设置全局loading handler
const setGlobalLoadingHandler = (handler: LoadingHandler) => {
    loadingHandler = handler;
};

// 获取token的函数
const getToken = (): string | null => {
    return sessionStorage.getItem('token');
};

// 请求拦截
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 开启全局loading
        loadingHandler.start();

        // 这里添加认证信息，例如JWT Token等全局请求头的设置
        const token = getToken();
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`
            };
        }
        return config;
    },
    (error) => {
        // 关闭全局loading
        loadingHandler.end();

        // 做一些请求错误的处理
        return Promise.reject(error);
    }
);

// 响应拦截
instance.interceptors.response.use(
    (response) => {
        // 关闭全局loading
        loadingHandler.end();

        // 对响应数据做点什么
        return response;
    },
    async (error: AxiosError) => {
        // 关闭全局loading
        loadingHandler.end();

        const originalRequest = error.config as ExtendedAxiosRequestConfig;
        if (error.response && error.response.status === 401) {
            // 如果返回401错误，可以在这里处理重新获取token的逻辑，然后再次发送原请求
            // 比如刷新token，重新登录等
        }

        // 检查是否设置了重试配置
        if (originalRequest.retry && originalRequest.retry > 0) {
            originalRequest.retry -= 1; // 设置重试次数减1
            const retryDelay = originalRequest.retryDelay || 1000; // 设置重试延迟
            await new Promise((resolve) => setTimeout(resolve, retryDelay)); // 延时等待
            return instance(originalRequest); // 重新发送请求
        }

        // 抛出错误
        return Promise.reject(error);
    }
);

// 请求方法封装
const request = <T>(
    config: {
        path: string;
        method: string;
        headers?: any;
        data?: any;
        params?: any;
        cancelToken?: CancelTokenSource;
    } & AxiosRequestConfig
): Promise<T> => {
    const { path, method, headers, data, params, ...rest } = config;
    return instance({
        url: path,
        method,
        headers,
        data,
        params,
        ...rest
    })
        .then((response: AxiosResponse) => response.data)
        .catch((error: AxiosError) => {
            // 可以在这里统一处理错误
            console.error('API request error:', error);
            throw error; // 或者返回错误状态
        });
};

// 导出取消请求方法生成器
const createCancelToken = (): CancelTokenSource => {
    return axios.CancelToken.source();
};

export { request, createCancelToken, setGlobalLoadingHandler };
