import React from 'react'
import { Timeline,Collapse } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router';
import Layout from "./layout.js"

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const App = withRouter(class App extends React.Component {

    render(){

        return(
            <Layout>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="This is panel header 1" key="1">
                        <p>{text}</p>
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                        <p>{text}</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>{text}</p>
                    </Panel>
                </Collapse>
                <Timeline mode="alternate">
                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
                    <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo.
                    </Timeline.Item>
                    <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                        Technical testing 2015-09-01
                    </Timeline.Item>
                </Timeline>
            </Layout>);

    }
});

export default App;