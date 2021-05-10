import React from 'react'
import ReactDOM from 'react-dom'
import './index.less';
import 'antd/dist/antd.css';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import { Layout, Menu, Breadcrumb } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Admin from '../components/admin'
import Home from '../components/home'
import User from '../components/user'
import News from '../components/news'
import DatePicker from '../components/datepicker'
import Form from '../components/form'
import DynForm from '../components/dynform'

const initRouter = () => {

    const node = config.map(menu => {
        config.map(menu => {
            // const comp = React.lazy(() => import(menu.component));
            // const comp = import(menu.component);
            if (menu.children) {
                <Route path={menu.path} component={menu.component}>

                </Route>
            } else {
                <Route path={menu.path} component={menu.component}>

                </Route>
            }
        })
    });

    return node;
}

ReactDOM.render(
    <Router>
        <React.Suspense fallback="">
            <Switch>
                <Route path="/admin" component={Admin}>
                </Route>
                <Route path="/home" component={Home}>
                </Route>
                <Route path="/user" component={User}>
                </Route>
                <Route path="/news/newsDetail" component={News}>
                </Route>
                <Route path="/date/datepicker" component={DatePicker}>
                </Route>
                <Route path="/form" component={Form}>
                </Route>
                <Route path="/dynform" component={DynForm}>
                </Route>
                <Route component={Home}>
                </Route>
            </Switch>
        </React.Suspense>
    </Router>
    , document.getElementById("root"))
