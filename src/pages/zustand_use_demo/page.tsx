import { useStore } from './useStore';

import type { NextPage } from 'next';

const UseDemo: NextPage = () => {
    const { count, increase } = useStore();

    return (
        <div>
            <Bbb></Bbb>
            <button onClick={increase}>increase</button>
        </div>
    );
};

const Bbb = () => {
    return <Ccc></Ccc>;
};

const Ccc = () => {
    const { count } = useStore();
    return <p>Counter: {count.toString()} </p>;
};

export default UseDemo;
