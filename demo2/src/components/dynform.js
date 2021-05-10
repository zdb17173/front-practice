import React, { useState,useEffect  } from 'react'
import {withRouter} from "react-router";
import Layout from "./layout.js"
import axios from 'axios';
import moment from 'moment';

import { Form, Input, Button, Checkbox, Radio, DatePicker, Row, Col, Modal } from 'antd';


//基于Form.List的动态表单方案，全部基于Form.List动态添加字段
const FormData = function(fields){

    const field = fields.field;

    return (<Row>
        <Col span={6}>
            <Form.Item {...field} name={[field.name, '11']}>
                <Input/>
            </Form.Item>
        </Col>
        <Col span={6}>
            <Form.Item {...field} name={[field.name, '22']}>
                <Input/>
            </Form.Item>
        </Col>
        <Col span={6}>
            <Form.Item {...field} name={[field.name, '33']}>
                <Input/>
            </Form.Item>
        </Col>
        <Col span={6}>
            <Form.Item {...field} name={[field.name, '44']}>
                <Input/>
            </Form.Item>
        </Col>
    </Row>)
}

const onFinish = (values) => {
    console.log(values);

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

const FormListApp = withRouter(function(props) {

    const [form] = Form.useForm();

    return (
        <Layout>
            <Form
                form={form}
                name="basic"
                // initialValues={{ remember: true }}
                onFinish={onFinish}>

                <Form.List name="names">
                    {
                        (fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => {

                                    return (<FormData field={field} index={index}/>);
                                        // return (<Row>
                                        //     <Col span={6}>
                                        //         <Form.Item {...field} name={[field.name, '11']}>
                                        //             <Input/>
                                        //         </Form.Item>
                                        //     </Col>
                                        //     <Col span={6}>
                                        //         <Form.Item {...field} name={[field.name, '22']}>
                                        //             <Input/>
                                        //         </Form.Item>
                                        //     </Col>
                                        //     <Col span={6}>
                                        //         <Form.Item {...field} name={[field.name, '33']}>
                                        //             <Input/>
                                        //         </Form.Item>
                                        //     </Col>
                                        //     <Col span={6}>
                                        //         <Form.Item {...field} name={[field.name, '44']}>
                                        //             <Input/>
                                        //         </Form.Item>
                                        //     </Col>
                                        // </Row>)
                                }

                                )}

                                <Form.Item>
                                    <Button type="dashed" style={{width:"50%"}} onClick={() => add()}>
                                        add field
                                    </Button>
                                </Form.Item>
                            </>
                        )
                    }
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Layout>);
});

//动态加载表单方案2 基于modal弹窗填写子表单
const FormDynApp = withRouter(function(props) {

    const [form] = Form.useForm();

    useEffect(() => {
        axios.get("http://127.0.0.1:8081/api/test/get?id=1")
            .then(response => {
                response = response.data;
                if (response.status == 200) {

                    form.setFieldsValue(response.data);
                }
            }).catch(error => console.log(`Save failed1 : (${error})`));
    }, []);

    const CreateFormModal = (props) => {
        const [modalVisible, setModalVisible] = useState(false);
        const index = props.index;
        const field = props.field;

        return (
            <>
                <Button type="dashed" style={{width:"50%"}} onClick={() => setModalVisible(true)} >
                    show modal {index}
                </Button>
                <Modal width={"80%"} visible={modalVisible}
                       onOk={() => {setModalVisible(false)}}
                       onCancel={() => {
                           setModalVisible(false);
                       }}
                >
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                name={[field.name, "title" + index]}
                                label="Title">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name={[field.name, "ddd" + index]}
                                label="ddd">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                name={[field.name, "sss" + index]}
                                label="sss" style={{marginTop:1000}}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Modal>
            </>);
    }

    return (
        <Layout>
            <Form
                form={form}
                name="basic"
                // initialValues={{ remember: true }}
                onFinish={onFinish}>

                <Form.List name="dynData">
                    {
                        (fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => {
                                        return (<CreateFormModal
                                                    field={field}
                                                    index={index}
                                                    key={"dynModal" + index}/>);
                                    }

                                )}

                                <Form.Item>
                                    <Button type="dashed" style={{width:"50%"}} onClick={() => add()}>
                                        add field
                                    </Button>
                                </Form.Item>
                            </>
                        )
                    }
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Layout>);
});

export default FormDynApp;
// export default FormListApp;