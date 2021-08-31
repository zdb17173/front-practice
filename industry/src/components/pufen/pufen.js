import {
    Button,
    Card,
    Col,
    DatePicker,
    Divider,
    Form,
    Image,
    Input,
    message,
    Radio,
    Row,
    Select,
    Upload,
    BackTop,
    Collapse,
    Modal
} from 'antd';

import React, {useEffect, useState} from 'react';
import axios from "axios/index";
// import { PageContainer } from '@ant-design/pro-layout';
import PageContainer from "./layout.js"

const getBaseUrl = () =>{
    return "http://localhost:8080"
}

export default function(fields){
    const [form] = Form.useForm();
    const [disable, setDisable] = useState(false);

    const getData = async(params) => {
        return axios.get("http://127.0.0.1:8080/api/indus/get?indexId=7&dbType=3");
    }

    const addData = async(params) => {
        params.dbType = 3;
        params.id = 7;
        return axios.post("http://127.0.0.1:8080/api/indus/add", {...params});
    }

    useEffect(() => {
        getData().then(response => {
            response = response.data;
            if (response.status == 200) {
                var formData = JSON.parse(response.data);

                // if(formData["shiWenLiXueXingNeng_CeShiShiJian1"]!= null && formData["shiWenLiXueXingNeng_CeShiShiJian1"]!= undefined)
                //     formData["shiWenLiXueXingNeng_CeShiShiJian1"] = moment(formData["shiWenLiXueXingNeng_CeShiShiJian1"], 'yyyy-MM-DD HH:mm:ss');
                // if(formData["shiWenLiXueXingNeng_CeShiShiJian2"]!= null && formData["shiWenLiXueXingNeng_CeShiShiJian2"]!= undefined)
                //     formData["shiWenLiXueXingNeng_CeShiShiJian2"] = moment(formData["shiWenLiXueXingNeng_CeShiShiJian2"], 'yyyy-MM-DD HH:mm:ss');
                // if(formData["gaoWenLiXueXingNeng_CeShiShiJian1"]!= null && formData["gaoWenLiXueXingNeng_CeShiShiJian1"]!= undefined)
                //     formData["gaoWenLiXueXingNeng_CeShiShiJian1"] = moment(formData["gaoWenLiXueXingNeng_CeShiShiJian1"], 'yyyy-MM-DD HH:mm:ss');
                // if(formData["gaoWenLiXueXingNeng_CeShiShiJian2"]!= null && formData["gaoWenLiXueXingNeng_CeShiShiJian2"]!= undefined)
                //     formData["gaoWenLiXueXingNeng_CeShiShiJian2"] = moment(formData["gaoWenLiXueXingNeng_CeShiShiJian2"], 'yyyy-MM-DD HH:mm:ss');

                //setSaoMiaoCeLueImg(formData["saoMiaoCeLueImg"])

                form.setFieldsValue(formData);
            }
        }).catch(error => console.log(`Save failed1 : (${error})`));

    }, []);

    const formItemLayout = {
        // labelCol: {span: 2},
        // wrapperCol: { span: 8 },
    };

    const itemLayout = {
        labelCol: { span: 2 },
        // wrapperCol: { span: 22 },
    };
    const itemTwoLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 12 },
    };

    const itemHalfTwoLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    };

    const itemThreeLayout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 11 },
    };
    const itemFourLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    };

    const submit = (values) => {

        addData(values).then((res) => {
            const { status, description } = res;

            if (status === 200) {
                message.success('保存成功');
                // history.push('/list');
            } else {
                message.error(`报错失败: ${description}`);
            }
        });
    };


    const CreatePart = (props) => {
        const [modalVisible, setModalVisible] = useState(false);
        const [del, setDel] = useState("true");
        const index = props.index;
        const field = props.field;
        const remove = props.remove;
        const [title, setTitle] = useState("新建零件加工策略");

        useEffect(() => {
            var part = form.getFieldValue("partJiaGongCeLue");

            try{
                if(part[index]!= undefined){
                    var title = part[index]["pannelTitle"];
                    if(title != undefined)
                        setTitle(title);
                    else
                        setTitle("新建零件加工策略");
                }
            }catch (e) {
                setTitle("新建零件加工策略");
            }

            if(part[index] == undefined)
                part[index] = {};
            part[index]["index"] = index;
            form.setFieldsValue({partJiaGongCeLue:part});
        }, []);

        return (
            <>
                <Card style={{display:del}}>
                    <Row>
                        <Col span={22}>
                            {title}
                        </Col>
                        {
                            disable?
                                (<Col span={2}>
                                    <Button type="dashed" onClick={() => setModalVisible(true)} >
                                        查看
                                    </Button>
                                </Col>)
                                :
                                (<Col span={2}>
                                    <Button type="dashed" onClick={() => setModalVisible(true)} >
                                        编辑
                                    </Button>
                                    <Button type="dashed" onClick={() => remove(field.name)} >
                                        删除
                                    </Button>
                                </Col>)
                        }
                    </Row>
                </Card>

                <Modal width={"80%"} visible={modalVisible}
                       onOk={() => {setModalVisible(false)}}
                       onCancel={() => {
                           setModalVisible(false);
                       }}>
                    <Card style={{marginTop:15}} title={"Part加工策略"}>
                        <Row>
                            <Col span={24} >
                                <Form.Item
                                    {...itemLayout}
                                    name={[field.name, "pannelTitle"]}
                                    label="零件加工策略名称">
                                    <Input onChange={(v) => setTitle(v.target.value)} disabled={disable}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain>
                            &nbsp;切片&nbsp;
                        </Divider>

                        <Row>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "qiePianShuXing"]} label="零件切片层厚:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "jiaGongCeLueShuXing"]} label="扫描每个支撑:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain>
                            &nbsp;重新缩放&nbsp;
                        </Divider>

                        <Row>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "xSuoFang"]} label="X缩放:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "ySuoFang"]} label="Y缩放:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "zSuoFang"]} label="Z缩放:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item {...itemTwoLayout}
                                           label="缩放中心:">
                                    <Form.Item name={[field.name, "gongNeng"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="平台起点">平台起点</Radio>
                                            <Radio value="零件中心">零件中心</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain>
                            &nbsp;路径生成&nbsp;
                        </Divider>

                        <Row>
                            <Col span={12}>
                                <Form.Item {...itemTwoLayout}
                                           label="开启零件轮廓:">
                                    <Form.Item name={[field.name, "kaiQiLingJianLunKuo"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item {...itemTwoLayout}
                                           label="开启上表面:">
                                    <Form.Item name={[field.name, "kaiQiShangBiaoMian"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain style={subDividerStyle}>
                            &nbsp;&nbsp;内表面&nbsp;&nbsp;
                        </Divider>

                        <Row>
                            <Col span={12}>
                                <Form.Item {...itemTwoLayout}
                                           label="开启里表面:">
                                    <Form.Item name={[field.name, "kaiQiLiBiaoMian"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item {...itemTwoLayout}
                                           label="旋转/移动曝光:">
                                    <Form.Item name={[field.name, "xuanZhuanYiDongBaoGuang"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Item {...itemTwoLayout}
                                           label="应用旋转角度:">
                                    <Form.Item name={[field.name, "yingYongXuanZhuanJiaoDu"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "baoGuangCiShu"]} label="曝光次数:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "luJingPianYi"]} label="路径偏移:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item {...itemTwoLayout}
                                           label="填充图案类型:" >
                                    <Form.Item name={[field.name, "tianChongTuAnLeiXing"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="条纹图案">条纹图案</Radio>
                                            <Radio value="棋盘图案">棋盘图案</Radio>
                                            <Radio value="无图案">无图案</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "luJingJuLi"]} label="路径距离:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "tiaoZhuangDaXiao"]} label="条状大小:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "tiaoZhuangPianYi"]} label="条状偏移:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                            label="路径排序:" >
                                    <Form.Item name={[field.name, "luJingPaiXu"]} rules={[{ required: false }]}>
                                        <Select>
                                            <Select.Option value="之字形">之字形</Select.Option>
                                            <Select.Option value="一字型">一字型</Select.Option>
                                            <Select.Option value="优化排序">优化排序</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "chuShiXuanZhuanJiaoDu"]} label="初始旋转角度:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "xuanZhuanZengLiang"]} label="旋转增量:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "yiDongXiShu"]} label="移动系数:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           label="短向量优化:" >
                                    <Form.Item name={[field.name, "duanXiangLiangYouHua"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain style={subDividerStyle}>
                            &nbsp;&nbsp;下表面&nbsp;&nbsp;
                        </Divider>

                        <Row>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           label="开启下表面:" >
                                    <Form.Item name={[field.name, "kaiQiXiaBiaoMian"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain style={subDividerStyle}>
                            &nbsp;&nbsp;实体支撑&nbsp;&nbsp;
                        </Divider>

                        <Row>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           label="开启轮廓:" >
                                    <Form.Item name={[field.name, "shiTiZhiChengKaiQiLunKuo"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           label="开启路径规划:" >
                                    <Form.Item name={[field.name, "shiTiZhiChengKaiQiLuJingGuiHua"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "shiTiZhiChengChuShiXuanZhuanJiaoDu"]} label="初始旋转角度:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "shiTiZhiChengXuanZhuanZengLiang"]} label="旋转增量:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Modal>
            </>);
    }


    const CreateSupport = (props) => {
        const [modalVisible, setModalVisible] = useState(false);
        const [del, setDel] = useState("true");
        const index = props.index;
        const field = props.field;
        const remove = props.remove;
        const [title, setTitle] = useState("新建支撑加工策略");

        useEffect(() => {
            var support = form.getFieldValue("supportJiaGongCeLue");
            try{
                if(support[index]!= undefined){

                        var title = support[index]["pannelTitle" + index];
                        if(title != undefined)
                            setTitle(title);
                        else
                            setTitle("新建支撑加工策略");
                }
            }catch (e) {
                setTitle("新建支撑加工策略");
            }

            if(support[index] == undefined)
                support[index] = {};
            support[index]["index"] = index;
            form.setFieldsValue({supportJiaGongCeLue:support});
        }, []);

        return (
            <>
                <Card style={{display:del}}>
                    <Row>
                        <Col span={22}>
                            {title}
                        </Col>
                        {
                            disable?
                                (<Col span={2}>
                                    <Button type="dashed" onClick={() => setModalVisible(true)} >
                                        查看
                                    </Button>
                                </Col>)
                                :
                                (<Col span={2}>
                                    <Button type="dashed" onClick={() => setModalVisible(true)} >
                                        编辑
                                    </Button>
                                    <Button type="dashed" onClick={() => remove(field.name)} >
                                        删除
                                    </Button>
                                </Col>)
                        }
                    </Row>
                </Card>

                <Modal width={"80%"} visible={modalVisible}
                       onOk={() => {setModalVisible(false)}}
                       onCancel={() => {
                           setModalVisible(false);
                       }}
                >
                    <Card style={{marginTop:15}}>
                        <Row>
                            <Col span={24} >
                                <Form.Item
                                    {...itemLayout}
                                    name={[field.name, "pannelTitle" + index]}
                                    label="支撑加工策略名称">
                                    <Input onChange={(v) => setTitle(v.target.value)} disabled={disable}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain>
                            &nbsp;切片&nbsp;
                        </Divider>

                        <Row>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "lingJianQiePianCengHou"]} label="零件切片层厚:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "saoMiaoMeiGeZhiCheng"]} label="扫描每个支撑:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain>
                            &nbsp;重新缩放&nbsp;
                        </Divider>

                        <Row>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "xSuoFang"]} label="X缩放:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "ySuoFang"]} label="Y缩放:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "zSuoFang"]} label="Z缩放:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Item {...itemTwoLayout}
                                           label="缩放中心:">
                                    <Form.Item name={[field.name, "gongNeng"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="平台起点">平台起点</Radio>
                                            <Radio value="零件中心">零件中心</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain>
                            &nbsp;路径生成&nbsp;
                        </Divider>

                        <Row>
                            <Col span={12}>
                                <Form.Item {...itemTwoLayout}
                                           label="开启零件轮廓:">
                                    <Form.Item name={[field.name, "kaiQiLingJianLunKuo"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item {...itemTwoLayout}
                                           label="开启上表面:">
                                    <Form.Item name={[field.name, "kaiQiShangBiaoMian"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Item {...itemTwoLayout}
                                           label="开启里表面:">
                                    <Form.Item name={[field.name, "kaiQiLiBiaoMian"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item {...itemTwoLayout}
                                           label="开启下表面:">
                                    <Form.Item name={[field.name, "kaiQiXiaBiaoMian"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain>
                            &nbsp;实体支撑&nbsp;
                        </Divider>

                        <Row>
                            <Col span={12}>
                                <Form.Item {...itemTwoLayout}
                                           label="开启轮廓:">
                                    <Form.Item name={[field.name, "kaiQiLunKuo"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item {...itemTwoLayout}
                                           label="开启路径规划:">
                                    <Form.Item name={[field.name, "kaiQiLuJingGuiHua"]} rules={[{ required: false }]}>
                                        <Radio.Group disabled={disable}>
                                            <Radio value="是">是</Radio>
                                            <Radio value="否">否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "xuanZhuanChuShiJiaoDu"]} label="旋转初始角度:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "xuanZhuanZengLiang"]} label="旋转增量:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain>
                            &nbsp;无固体支撑&nbsp;
                        </Divider>

                        <Row>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "jiGuangZhiJing"]} label="激光直径:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "jiGuangSuLv"]} label="激光速率:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item {...itemFourLayout}
                                           name={[field.name, "jiGuangGongLv"]} label="激光功率:" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Col>
                        </Row>

                    </Card>
                </Modal>
            </>);
    }

    return (
        <PageContainer>
            <Form form={form} name="control-ref" onFinish={submit} {...formItemLayout}>
                <Card title="通用属性">

                    <Divider orientation="left" plain>
                        &nbsp;材料默认值&nbsp;
                    </Divider>

                    <Row>
                        <Col span={6}>
                            <Form.Item {...itemFourLayout} label="切片属性:">
                                <Form.Item name="qiePianShuXing" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="jiaGongCeLueShuXing"
                                label="加工策略属性:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left" plain>
                        &nbsp;扫描顺序&nbsp;
                    </Divider>

                    <Row>
                        <Col span={6}>
                            <Form.Item {...itemFourLayout} label="加工顺序模式:">
                                <Form.Item name="jiaGongShunXuMoShi" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="regionGroup"
                                label="Region Grouping:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="paiXuFangFa"
                                label="排序方法:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="jieGouLeiXing"
                                label="结构类型:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left" plain>
                        &nbsp;MCS数据&nbsp;
                    </Divider>

                    <Row>
                        <Col span={6}>
                            <Form.Item {...itemFourLayout} label="名称:">
                                <Form.Item name="mingCheng" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="mcsMingCheng"
                                label="MCS名称:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="shuZhi"
                                label="数值:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="shuJuLeiXing"
                                label="数据类型:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6}>
                            <Form.Item {...itemFourLayout} label="MCS Unit:">
                                <Form.Item name="mcsUnit" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="jiGuangFenPeiLeiXing"
                                label="激光分配类型:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left" plain>
                        &nbsp;区域拆分&nbsp;
                    </Divider>

                    <Row>
                        <Col span={6}>
                            <Form.Item {...itemFourLayout} label="允许分割线偏移:">
                                <Form.Item name="yunXuFenGeXianPianYi" rules={[{ required: false }]}>
                                    <Input placeholder="" disabled={disable} />
                                </Form.Item>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="zuiXiaoFenGeXianPianYi"
                                label="最小分割线偏移:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="chaiFenXiangLiangChongDie"
                                label="拆分向量重叠:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                <Card title="加工策略" style={{marginTop:15}}>

                    <Form.List name="supportJiaGongCeLue">
                        {
                            (fields, { add, remove }, { errors }) => (
                                <>
                                    {disable? "" : (<Row>
                                        <Col span={24}>
                                            <Form.Item>
                                                <Button block type="dashed" style={{width:"100%"}} onClick={() => add()}>
                                                    添加Support类型加工策略
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>)}
                                    {fields.map((field, index) => {
                                            return (<CreateSupport
                                                field={field}
                                                index={index}
                                                remove={remove}
                                                key={"jiaGongCeLueSupport" + index}/>);
                                        }
                                    )}
                                </>
                            )
                        }
                    </Form.List>

                    <Form.List name="partJiaGongCeLue">
                        {
                            (fields, { add, remove }, { errors }) => (
                                <>
                                    {disable? "" : (<Row>
                                        <Col span={24}>
                                            <Form.Item>
                                                <Button block type="dashed" style={{width:"100%", marginTop:15}} onClick={() => add()}>
                                                    添加part类型加工策略
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>)}
                                    {fields.map((field, index) => {
                                            return (<CreatePart
                                                field={field}
                                                index={index}
                                                remove={remove}
                                                key={"jiaGongCeLuePart" + index}/>);
                                        }
                                    )}
                                </>
                            )
                        }
                    </Form.List>

                </Card>

                <Card title="最终效果" style={{marginTop:15}}>

                    <Divider orientation="left" plain>
                        &nbsp;预留参数&nbsp;
                    </Divider>

                    <Row>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="xgYuLiuCanShu1"
                                label="预留参数1:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="xgYuLiuCanShu2"
                                label="预留参数2:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="xgYuLiuCanShu3"
                                label="预留参数3:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="xgYuLiuCanShu4"
                                label="预留参数4:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                </Card>

                {!disable && (
                    <Form.Item
                        style={{
                            marginTop: 26,
                        }}
                        wrapperCol={{ span: 4, offset: 20 }}
                    >
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                )}
            </Form>

            <BackTop style={backTopStyle}>
                <div >返回顶部</div>
            </BackTop>
        </PageContainer>);

}

const subDividerStyle = {
    fontSize: 11
}

const backTopStyle = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    cursor: 'pointer',
    position: 'fixed',
    zindex: 999,
    right: '40px',
    bottom: '20px'
};