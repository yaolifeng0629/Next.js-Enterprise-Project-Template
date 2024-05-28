import { request } from '@/utils/request';

export function TestApi() {
    return request({
        path: '/test',
        method: 'get',
        params: {}
    });
}
