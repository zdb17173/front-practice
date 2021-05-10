import React from 'react'
import ReactDOM from 'react-dom'
import './index.less';
import 'antd/dist/antd.css';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import { Layout, Menu, Breadcrumb } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class CommonLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuList: props.menuList,
            showName:'',
        }
    }

    renderMenuList(menuList) {
        return menuList.map(menu => {
            if (menu.children) {
                return (
                    <Menu.SubMenu key={menu.path} title={menu.showName}>
                        {this.renderMenuList(menu.children)}
                    </Menu.SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={menu.path} path={menu.path}>{menu.showName}</Menu.Item>)
            }
        });
    }

    render() {

        const { menuList } = this.state;

        return (<Layout style={{ minHeight: '100%' }}>
            <Header className="header">
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        {this.renderMenuList(menuList)}
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: "auto",
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>);
    }
}

ReactDOM.render(
    <CommonLayout menuList={[
        {
            path: "1",
            showName : "1",
            children: [
                {
                    path: "1-1",
                    showName : "1-1",
                    components: ""
                },
                {
                    path: "1-2",
                    showName : "1-2"
                },
                {
                    path: "1-3",
                    showName : "1-3"
                }
            ]
        },
        {
            path: "2",
            showName : "2"
        },
        {
            path: "3",
            showName : "3"
        },
        {
            path: "4",
            showName : "444"
        }
    ]}/>
    , document.getElementById("root"))
