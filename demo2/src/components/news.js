import React from 'react'
import { List, Avatar } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import Layout from "./layout.js"

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

function query(variable){
    var q = location.search.substring(1);
    var vars = q.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return decodeURI(pair[1]);}
    }
    return(false);
}

const App = withRouter(function(props) {

    // const name = props.match.params.name;//采用/news/userDetail/:name? 方式传参时采用该方式获取
    const name  = query('name');//采用/news/userDetail?name=xxxx 方式传参时采用该方式获取

    return (<Layout>
        <h1>{name}</h1>
        <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
            </List.Item>
        )}
    /></Layout>);

});

export default App;