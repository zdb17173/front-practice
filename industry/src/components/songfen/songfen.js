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
// import { PageContainer } from '@ant-design/pro-layout';
import PageContainer from "./layout.js"
const { Panel } = Collapse;

import moment from 'moment';
import axios from 'axios';

const getBaseUrl = () =>{
    return "http://localhost:8080"
}

export default function(fields){

    const [form] = Form.useForm();
    const [disable, setDisable] = useState(false);
    const [saoMiaoCeLueImg, setSaoMiaoCeLueImg] = useState("");

    const getData = async(params) => {
        return axios.get("http://127.0.0.1:8080/api/indus/get?indexId=6&dbType=2");
    }

    const addData = async(params) => {
        params.dbType = 2;
        params.id = 6;
        params.saoMiaoCeLueImg = saoMiaoCeLueImg;
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

                setSaoMiaoCeLueImg(formData["saoMiaoCeLueImg"])

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

    const uploadProps = {
        name: 'file',
        action: `${getBaseUrl()}/api/file/upload`,
        disabled: disable,
        data: (file) => ({
            uploadFile: file,
            // description: 'dsada',
            name: file.name,
        }),
        listType: 'picture',
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);

                var img = `${getBaseUrl()}/api/file/download?fileName=${info.file.response.data}`;
                console.log(img);

                setSaoMiaoCeLueImg(img);

            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const CreatePannel = (props) => {
        const [modalVisible, setModalVisible] = useState(false);
        const [del, setDel] = useState("true");
        const index = props.index;
        const field = props.field;
        const remove = props.remove;
        const [title, setTitle] = useState("新建层");

        useEffect(() => {
            var cengList = form.getFieldValue("shuRuCanShuCeng");

            try{
                if(cengList[index]!= undefined) {
                    var title = cengList[index]["pannelTitle" + index];
                    if (title != undefined)
                        setTitle(title);
                    else
                        setTitle("新建层");
                }
            }catch (e) {
                setTitle("新建层");
            }
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
                                    label="层名称">
                                    <Input onChange={(v) => setTitle(v.target.value)} disabled={disable}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain>
                            &nbsp;送粉参数&nbsp;
                        </Divider>

                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "songFenZuiXingHao" + index]}
                                    label="送粉嘴型号">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "fenMoJiaoJu" + index]}
                                    label="粉末焦距">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "jiGuangYuFenMoJiaoJuChaZhi" + index]}
                                    label="激光与粉末焦距差值">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "songFenFangShi" + index]}
                                    label="送粉方式">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "songFenLiang" + index]}
                                    label="送粉量">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "fenZuiGaoDu" + index]}
                                    label="粉嘴高度">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "fenBanZhiJing" + index]}
                                    label="粉斑直径">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "fenMoZhuangTai" + index]}
                                    label="粉末状态">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain>
                            &nbsp;送粉气体参数&nbsp;
                        </Divider>

                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "songFenZaiQiYaLi" + index]}
                                    label="送粉载气压力">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "songFenZaiQiLiuLiang" + index]}
                                    label="送粉载气流量">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "songFenBaoHuQiLiuLiang" + index]}
                                    label="送粉保护气流量">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain>
                            &nbsp;激光参数&nbsp;
                        </Divider>

                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "jiGuangGongLv" + index]}
                                    label="激光功率">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "saoMiaoSuDu" + index]}
                                    label="扫描速度">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "pianYiLiang" + index]}
                                    label="偏移量">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "jiGuangJiaoJu" + index]}
                                    label="激光焦距">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "jiGuangTouQingXieJiaoDu" + index]}
                                    label="激光头倾斜角度">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "lengQueShiJian" + index]}
                                    label="冷却时间">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "xZhouXingCheng" + index]}
                                    label="X轴行程">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "yZhouXingCheng" + index]}
                                    label="Y轴行程">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "zZhouDanCengXingChengHuoDanCengHouDu" + index]}
                                    label="Z轴单层行程/单层厚度">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "chenJiCengShu" + index]}
                                    label="沉积层数">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "jiGuangNengLiangFenBuMoShi" + index]}
                                    label="激光能量分布模式">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "guangBanChiCun" + index]}
                                    label="光斑尺寸">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain>
                            &nbsp;充氩仓参数&nbsp;
                        </Divider>

                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "qiFenHuanJingHanYangLiang" + index]}
                                    label="气氛环境(氧含量)">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "chongYaCangBaoHuQiYaLi" + index]}
                                    label="充氩仓保护气压力">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "chongYaCangBaoHuQiTiLiuLiang" + index]}
                                    label="充氩仓保护气体流量">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider orientation="left" plain>
                            &nbsp;预留参数&nbsp;
                        </Divider>

                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "yuLiuCanShu1" + index]}
                                    label="预留参数1">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "yuLiuCanShu2" + index]}
                                    label="预留参数2">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "yuLiuCanShu3" + index]}
                                    label="预留参数3">
                                    <Input disabled={disable}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    {...itemFourLayout}
                                    name={[field.name, "yuLiuCanShu4" + index]}
                                    label="预留参数4">
                                    <Input disabled={disable}/>
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
                <Card title="主要属性">
                    <Row>
                        <Col span={12}>
                            <Form.Item {...itemTwoLayout} label="功能:">
                                <Form.Item name="gongNeng" rules={[{ required: true }]}>
                                    <Radio.Group disabled={disable}>
                                        <Radio value="修复或熔覆">修复或熔覆</Radio>
                                        <Radio value="打印">打印</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                {...itemTwoLayout}
                                name="caiLiaoPaiHao"
                                label="材料牌号:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="queXianLeiXing"
                                label="缺陷类型:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="caiLiaoLeiXing"
                                label="材料类型:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="jiBanChiCun"
                                label="基板尺寸:"
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
                        &nbsp;扫描策略&nbsp;
                    </Divider>

                    <Row>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="guiHuaLuJing"
                                label="规划路径:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="shiJiLuJing"
                                label="实际路径:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                {...itemTwoLayout}
                                name="saoMiaoCeLueMiaoShu"
                                label="扫描策略描述:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Form.Item {...itemTwoLayout} label={"扫描策略图片上传"}>
                                <Upload {...uploadProps} {...itemTwoLayout}>
                                    <Button>Click to Upload</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                {...itemTwoLayout}
                                name="saoMiaoCeLueImg"
                                label="扫描策略图片:"
                                // value={this.state.uploadSrc}
                                rules={[{ required: false }]}
                            >
                                <Image
                                    width={200}
                                    src={saoMiaoCeLueImg}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                <Card title="输入参数-层">

                    <Form.List name="shuRuCanShuCeng">
                        {
                            (fields, { add, remove }, { errors }) => (
                                <>
                                    {disable? "" : (<Row>
                                        <Col span={24}>
                                            <Form.Item>
                                                <Button type="dashed" style={{width:"100%"}} onClick={() => add()}>
                                                    添加一个层
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>)}
                                    {fields.map((field, index) => {
                                            return (<CreatePannel
                                                field={field}
                                                index={index}
                                                remove={remove}
                                                key={"shuRuCanShuCeng" + index}/>);
                                        }
                                    )}
                                </>
                            )
                        }
                    </Form.List>

                </Card>

                <Card title="最终效果">
                    <Divider orientation="left" plain>
                        &nbsp;质量参数&nbsp;
                    </Divider>
                    <Row>
                        <Col span={24}>
                            <Form.Item {...itemLayout} label="表面质量:">
                                <Form.Item name="biaoMianZhiLiang" rules={[{ required: true }]}>
                                    <Radio.Group disabled={disable}>
                                        <Radio value="飞溅">飞溅</Radio>
                                        <Radio value="粘粉">粘粉</Radio>
                                        <Radio value="表面成型">表面成型</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="rongKuan"
                                label="熔宽:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="rongGao"
                                label="熔高:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="daJieLv"
                                label="搭接率:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="qiKongLv"
                                label="气孔率:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>


                    <Divider orientation="left" plain>
                        &nbsp;室温力学性能&nbsp;
                    </Divider>

                    <Row>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="swKangLaQiangDu"
                                label="抗拉强度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="swZuiDaLi"
                                label="最大力:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="swDuanHouShenChangLv"
                                label="断后伸长率:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="swCeShiShiJian"
                                label="测试时间:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="swQuFuQiangDu"
                                label="屈服强度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="swKangJianQiangDu"
                                label="抗剪强度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="swYingDu"
                                label="硬度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="swJiaZaiZaiHe"
                                label="加载载荷:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="swJiaZaiShiJian"
                                label="加载时间:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left" plain>
                        &nbsp;高温力学性能&nbsp;
                    </Divider>

                    <Card>
                        <Row>
                            <Col span={24}>
                            <Card title={"高温力学性能测试数据1"}>
                                <Row>
                                    <Col span={6}>
                                        <Form.Item
                                            {...itemFourLayout}
                                            name="gw1CeShiWenDu"
                                            label="测试温度:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            {...itemFourLayout}
                                            name="gw1KangLaQiangDu"
                                            label="抗拉强度:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            {...itemFourLayout}
                                            name="gw1QuFuQiangDu"
                                            label="屈服强度:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            {...itemFourLayout}
                                            name="gw1DuanHouShenChangLv"
                                            label="断后伸长率:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={6}>
                                        <Form.Item
                                            {...itemFourLayout}
                                            name="gw1CeShiShiJian"
                                            label="测试时间:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Card title={"高温力学性能测试数据2"}>
                                    <Row>
                                        <Col span={6}>
                                            <Form.Item
                                                {...itemFourLayout}
                                                name="gw2CeShiWenDu"
                                                label="测试温度:"
                                                rules={[{ required: false }]}
                                            >
                                                <Input placeholder="" disabled={disable} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                {...itemFourLayout}
                                                name="gw2ZuiDaLi"
                                                label="最大力:"
                                                rules={[{ required: false }]}
                                            >
                                                <Input placeholder="" disabled={disable} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                {...itemFourLayout}
                                                name="gw2DaJieMianJi"
                                                label="搭接面积:"
                                                rules={[{ required: false }]}
                                            >
                                                <Input placeholder="" disabled={disable} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                {...itemFourLayout}
                                                name="gw2KangJianQiangDu"
                                                label="抗剪强度:"
                                                rules={[{ required: false }]}
                                            >
                                                <Input placeholder="" disabled={disable} />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={6}>
                                            <Form.Item
                                                {...itemFourLayout}
                                                name="gw2CeShiShiJian"
                                                label="测试时间:"
                                                rules={[{ required: false }]}
                                            >
                                                <Input placeholder="" disabled={disable} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Card title={"高温力学性能测试数据3"}>
                                    <Row>
                                        <Col span={6}>
                                            <Form.Item
                                                {...itemFourLayout}
                                                name="gw3YingDu"
                                                label="硬度:"
                                                rules={[{ required: false }]}
                                            >
                                                <Input placeholder="" disabled={disable} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                {...itemFourLayout}
                                                name="gw3JiaZaiZaiHe"
                                                label="加载载荷:"
                                                rules={[{ required: false }]}
                                            >
                                                <Input placeholder="" disabled={disable} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                {...itemFourLayout}
                                                name="gw3JiaZaiShiJian"
                                                label="加载时间:"
                                                rules={[{ required: false }]}
                                            >
                                                <Input placeholder="" disabled={disable} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Card>

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