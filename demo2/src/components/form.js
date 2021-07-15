import React, { useState,useEffect  } from 'react'
import {withRouter} from "react-router";
import Layout from "./layout.js"
import axios from 'axios';
import moment from 'moment';

import { Form, Input, Button, Checkbox, Radio, DatePicker, Row, Col } from 'antd';

const App = withRouter(function(props) {

    const [fields, setFields] = useState();
    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:8081/api/test/get?id=1")
            .then(response => {
                response = response.data;
                if (response.status == 200) {

                    //日期类反显需要预处理
                    response.data["date"] = moment(response.data["date"], 'yyyy-MM-DD HH:mm:ss');

                    form.setFieldsValue(response.data);
                    // form.initialValues = response.data;
                    // setFields(response.data);
                }
            }).catch(error => console.log(`Save failed1 : (${error})`));
    }, []);

    const onFinish = (values) => {
        console.log(values);

        //日期类提交需要预处理
        values.date = values["date"].format('yyyy-MM-DD HH:mm:ss');

        axios.post("http://127.0.0.1:8081/api/test/add", {...values})
            .then(response => {
                response = response.data;
                if (response.status == 200) {
                    console.log('Save success.');
                } else {
                    console.log(`Save failed2 : (${response.description})`);
                }
            }).catch(error => console.log(`Save failed1 : (${error})`));

    }

    const itemFourLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 11 },
    };

    const itemThreeLayout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 11 },
    };

    const itemTwoLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 12 },
    };

    const firstItemLayout = {
        labelCol: { span: 4 },
        // wrapperCol: { span: 22 },
    };

    const rowLayout = {

    }

    return (
        <Layout>
            <Form
                form={form}
                name="basic"
                // initialValues={{ remember: true }}
                onFinish={onFinish}>

                <Row {...rowLayout}>
                    <Col span={12}>
                        <Form.Item label="材料:" {...firstItemLayout}>
                            <Input.Group compact>
                                <Form.Item name="cailiaoRadio" rules={[{ required: true }]}>
                                    <Radio.Group >
                                        <Radio value="铝合金">铝合金</Radio>
                                        <Radio value="钛合金">钛合金</Radio>
                                        <Radio value="合金">高温合金</Radio>
                                        <Radio value="不锈钢">不锈钢</Radio>
                                        <Radio value="其他">其他</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name="cailiaoOther">
                                    <Input placeholder=""  style={{ width: 120 }}/>
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="A的属性为" name="a" {...firstItemLayout} >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row {...rowLayout}>
                    <Col span={12}>
                        <Form.Item label="Date" name="date" {...firstItemLayout}>
                            <DatePicker
                                showTime
                                format="yyyy-MM-DD HH:mm:ss"/>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Date" name="date" {...firstItemLayout}>
                            <DatePicker
                                showTime
                                format="yyyy-MM-DD HH:mm:ss"/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row {...rowLayout}>
                    <Col span={12}>
                        <Form.Item {...firstItemLayout} label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row {...rowLayout}>
                    <Col span={12}>
                        <Form.Item {...firstItemLayout} label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>

                <Row {...rowLayout}>
                    <Col span={12}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Layout>);
});

export default App;