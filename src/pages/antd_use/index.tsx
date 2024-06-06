import React from 'react';

import { Button, Slider } from 'antd';

const Home = () => (
    <div className="App">
        <Button type="primary">Button</Button>

        <Slider defaultValue={30} />
    </div>
);

export default Home;
