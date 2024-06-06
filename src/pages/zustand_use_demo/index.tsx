import { useStore } from './useStore';

import type { NextPage } from 'next';

const UseDemo: NextPage = () => {
    const { increase } = useStore();

    return (
        <div>
            <DisplayData></DisplayData>
            <button onClick={increase}>increase</button>
        </div>
    );
};

const DisplayData = () => {
    const { count } = useStore();
    return <p>Counter: {count.toString()} </p>;
};

export default UseDemo;
