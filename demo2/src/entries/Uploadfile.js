import { Form, Input, Button, Select, Layout, Row, Col,Radio,Divider, Card } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
const { Header, Content, Footer, Sider } = Layout;
import { PageContainer } from '@ant-design/pro-layout';
import axios from 'axios';
import { Upload, Modal, message, Image } from 'antd';


class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            uploadSrc : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
    }

    render() {
        const self = this;
        const uploadProps = {
            name: 'file',
            action: 'http://127.0.0.1:8080/api/test/upload',
            data: (file) => ({
                uploadFile: file,
                description: "dsada",
                name: file.name
            }),
            listType:"text",
            onChange(info) {
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    self.setState({uploadSrc: "http://127.0.0.1:8080/api/test/download?fileName=" + info.file.name});
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        }
        const formRef = React.createRef();
        return (
            <PageContainer>
                <Layout>
                    <Card title="sadasda">
                        <Row>
                            <Col>
                                <Upload {...uploadProps}>
                                    <Button >Click to Upload</Button>
                                </Upload>

                                <Image width={200} src={this.state.uploadSrc}/>
                            </Col>
                        </Row>
                        <Row>
                            <Form ref={this.formRef} name="control-ref" onFinish={this.submit} >
                                <Form.Item name="jieTouXingShi" label="接头形式:">
                                    <Radio.Group onChange={this.changeRadio} >
                                        <Radio value="对接接头">对接接头</Radio>
                                        <Radio value="锁底对接接头">锁底对接接头</Radio>
                                        <Radio value="T型接头">T型接头</Radio>
                                        <Radio value="角接接头">角接接头</Radio>
                                        <Radio value="搭接接头">搭接接头</Radio>
                                        <Radio value="其他">其他</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name="jieTouXingShiOther" label="其他:">
                                    { <Input placeholder="" style={{width:94}} /> }
                                </Form.Item>
                            </Form>
                        </Row>
                    </Card>
                </Layout>
            </PageContainer>
        );
    }
}


export default App;