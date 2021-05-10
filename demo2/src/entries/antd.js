import React from 'react'
import ReactDOM from 'react-dom'
import './index.less';
import Upload from './Uploadfile';
import 'antd/dist/antd.css';
import User from '../components/user'

ReactDOM.render(
    <div>
        <div className="common-layout-header">hello  webpack !!!</div>
        <Upload />
        <User />
    </div>
    , document.getElementById("root"))