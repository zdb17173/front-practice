import React, { useState,useEffect  } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb} from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import { RouteComponentProps, withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import menuconfig from '../config/menu.js'

const CommonLayout = withRouter(function(props) {

    //menu得初始化高亮
    const [selectedMenu, setSelectedMenu] = useState([location.pathname.split(":")[0]]);
    const [openSubMenu, setOpenSubMenu] = useState(["/date"]);

    //初始化
    useEffect(() => {

    }, []);

    const renderMenuList = (menuList) => {

        return menuList.map(menu => {
            if (menu.children) {

                var showSubMenu = false;
                menu.children.map( k => {
                    if(k.hideInMenu == undefined || k.hideInMenu!= true)
                        showSubMenu = true;
                })

                if(showSubMenu)
                    return (
                        <Menu.SubMenu key={menu.path} title={menu.showName}>
                            {renderMenuList(menu.children)}
                        </Menu.SubMenu>
                    );
                else
                    return (<Menu.Item key={menu.path} path={menu.path}>{menu.showName}</Menu.Item>);
            } else {
                if(menu.hideInMenu != true)
                    return (<Menu.Item key={menu.path} path={menu.path}>{menu.showName}</Menu.Item>)
            }
        });
    }

    const renderBreadcrumbItem = (path, menuList, parent, res) => {
        return menuList.map(menu => {
            if(menu.path == path){
                if(parent){
                    res.push(<Breadcrumb.Item key={parent.path}>
                        {parent.path == "" ? <span>{parent.breadcrumbName}</span> : <Link to={parent.path}>{parent.breadcrumbName}</Link>}
                    </Breadcrumb.Item>);
                }

                res.push(<Breadcrumb.Item key={menu.path}>
                    <span>{menu.breadcrumbName}</span>
                </Breadcrumb.Item>);
            }

            if (menu.children) {
                renderBreadcrumbItem(path, menu.children, menu, res);
            }
        });
    }

    const breadcrumbRender = () => {
        const { history, location } = props;
        const path = location.pathname.split(":")[0];
        if(path == "/")
            return <Breadcrumb.Item key="/"><span>home</span></Breadcrumb.Item>

        const array = new Array();
        renderBreadcrumbItem(path, menuconfig, null, array);
        return array;
    }

    const handleClick = (e) => {
        const { history } = props;
        history.push(`${e.keyPath[0]}`);
    }

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
                    style={{height: '100%', borderRight: 0}}
                    onClick={handleClick}
                    defaultOpenKeys={openSubMenu}
                    defaultSelectedKeys={selectedMenu}
                >
                    {renderMenuList(menuconfig)}
                </Menu>
            </Sider>
            <Layout style={{padding: '0 24px 0px'}}>
                <Breadcrumb style={{margin: '16px 0'}} >
                    {breadcrumbRender()}
                </Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 0,
                        margin: 0,
                        minHeight: "auto",
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    </Layout>);
});

export default CommonLayout;