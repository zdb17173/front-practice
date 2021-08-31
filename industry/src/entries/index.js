import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import User from '../components/user'

ReactDOM.render(
    <div>
        <div className="common-layout-header">hello  webpack !!!</div>
        <User />
    </div>
    , document.getElementById("root"))