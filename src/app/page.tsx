'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    function toDemo() {
        router.push('/zustand_use_demo');
    }
    return (
        <div>
            <h1>Mini Zustand</h1>
            <button
                className="group inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                onClick={toDemo}
            >
                跳转zustand示例
            </button>
        </div>
    );
}
