import { useState } from 'react';

import { NextPage } from 'next';

import Button from '@/components/button';

import * as IndexAPI from '@/api/index';

export default (() => {
    const [result, setResult] = useState(null);
    function handleGetData() {
        IndexAPI.TestApi()
            .then((res) => {
                console.log(res);
                // setResult(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <Button text={'测试请求'} click={handleGetData} />
            <h2>响应结果</h2>
            <p>{result}</p>
        </>
    );
}) as NextPage;
