import { request } from '@/utils/request';

// Test Api
export function TestApi() {
    return request({
        path: '/test',
        method: 'get',
        params: {}
    });
}
