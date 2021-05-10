import React, { useState, useEffect  } from 'react'
import {withRouter} from "react-router";
import Layout from './layout.js'
import { DatePicker, Space } from 'antd';
import moment from 'moment';

function onChange(time, timeString) {
    console.log(time, timeString);
}

const App = withRouter(function(props) {

    const [disable, setDisable] = useState(false);

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    return (<Layout>
            <Space size={[8, 16]} warp>
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    disabled={disable}
                    onChange={onChange}/>
                <DatePicker onChange={onChange} />
                <DatePicker onChange={onChange} picker="week" />
                <DatePicker onChange={onChange} picker="month" />
                <DatePicker onChange={onChange} picker="quarter" />
                <DatePicker onChange={onChange} picker="year" />
            </Space>
        </Layout>);
});

export default App;



