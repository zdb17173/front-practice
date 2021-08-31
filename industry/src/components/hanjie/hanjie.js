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
    BackTop
} from 'antd';
import React, {useEffect, useState} from 'react';
// import { PageContainer } from '@ant-design/pro-layout';
import PageContainer from "./layout.js"
import moment from 'moment';
// import { history } from 'umi';
import axios from 'axios';

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

const getBaseUrl = () =>{
    return "http://localhost:8080"
}

export default function(fields){

    const [disable, setDisable] = useState(false);
    const [hanJieCaiLiao_disable, setHanJieCaiLiao_disable] = useState(true);
    const [jieTouXingShi_disable, setJieTouXingShi_disable] = useState(true);
    const [jiGuangHanJieFangFa_disable, setJiGuangHanJieFangFa_disable] = useState(true);
    const [baiDongJiGuangHanJie_BaiDongFangShi_disable, setBaiDongJiGuangHanJie_BaiDongFangShi_disable] = useState(true);
    const [baiDongAndMaiChongJiGuangHanJie_BaiDongFangShi_disable, setBaiDongAndMaiChongJiGuangHanJie_BaiDongFangShi_disable] = useState(true);
    const [neiBuZhiLiang_hanjiexiaoguo, setNeiBuZhiLiang_hanjiexiaoguo] = useState("");

    const [form] = Form.useForm();

    const getData = async(params) => {
        return axios.get("http://127.0.0.1:8080/api/indus/get?indexId=5&dbType=1");
    }

    const addData = async(params) => {
        params.dbType = 1;
        params.id = 5;
        return axios.post("http://127.0.0.1:8080/api/indus/add", {...params});
    }

    useEffect(() => {
        getData().then(response => {
            response = response.data;
            if (response.status == 200) {
                var formData = JSON.parse(response.data);

                if(formData["shiWenLiXueXingNeng_CeShiShiJian1"]!= null && formData["shiWenLiXueXingNeng_CeShiShiJian1"]!= undefined)
                    formData["shiWenLiXueXingNeng_CeShiShiJian1"] = moment(formData["shiWenLiXueXingNeng_CeShiShiJian1"], 'yyyy-MM-DD HH:mm:ss');
                if(formData["shiWenLiXueXingNeng_CeShiShiJian2"]!= null && formData["shiWenLiXueXingNeng_CeShiShiJian2"]!= undefined)
                    formData["shiWenLiXueXingNeng_CeShiShiJian2"] = moment(formData["shiWenLiXueXingNeng_CeShiShiJian2"], 'yyyy-MM-DD HH:mm:ss');
                if(formData["gaoWenLiXueXingNeng_CeShiShiJian1"]!= null && formData["gaoWenLiXueXingNeng_CeShiShiJian1"]!= undefined)
                    formData["gaoWenLiXueXingNeng_CeShiShiJian1"] = moment(formData["gaoWenLiXueXingNeng_CeShiShiJian1"], 'yyyy-MM-DD HH:mm:ss');
                if(formData["gaoWenLiXueXingNeng_CeShiShiJian2"]!= null && formData["gaoWenLiXueXingNeng_CeShiShiJian2"]!= undefined)
                    formData["gaoWenLiXueXingNeng_CeShiShiJian2"] = moment(formData["gaoWenLiXueXingNeng_CeShiShiJian2"], 'yyyy-MM-DD HH:mm:ss');


                form.setFieldsValue(formData);
            }
        }).catch(error => console.log(`Save failed1 : (${error})`));

    }, []);

    const changeRadio = (type, v) => {

        if(v == "其他" && type == "hanJieCaiLiao"){
            setHanJieCaiLiao_disable(false);
        }else if(type == "hanJieCaiLiao"){
            setHanJieCaiLiao_disable(true);
            form.setFieldsValue({hanJieCaiLiaoOther: ""});
        }

        if(v == "其他" && type == "jieTouXingShi"){
            setJieTouXingShi_disable(false);
        }else if(type == "jieTouXingShi"){
            setJieTouXingShi_disable(true);
            form.setFieldsValue({"jieTouXingShiOther": ""});
        }

        if(v == "其他" && type == "jiGuangHanJieFangFa"){
            setJiGuangHanJieFangFa_disable(false);
        }else if(type == "jiGuangHanJieFangFa"){
            setJiGuangHanJieFangFa_disable(true);
            form.setFieldsValue({"jiGuangHanJieFangFaOther": ""});
        }

        if(v == "自定义" && type == "baiDongJiGuangHanJie_BaiDongFangShi"){
            setBaiDongJiGuangHanJie_BaiDongFangShi_disable(false);
        }else if(type == "baiDongJiGuangHanJie_BaiDongFangShi"){
            setBaiDongJiGuangHanJie_BaiDongFangShi_disable(true);
            form.setFieldsValue({"baiDongJiGuangHanJie_BaiDongFangShiOther": ""});
        }

        if(v == "自定义" && type == "baiDongAndMaiChongJiGuangHanJie_BaiDongFangShi"){
            setBaiDongAndMaiChongJiGuangHanJie_BaiDongFangShi_disable(false);
        }else if(type == "baiDongAndMaiChongJiGuangHanJie_BaiDongFangShi"){
            setBaiDongAndMaiChongJiGuangHanJie_BaiDongFangShi_disable(true);
            form.setFieldsValue({"baiDongAndMaiChongJiGuangHanJie_BaiDongFangShiOther": ""});
        }
    }

    const formatDate = (value) =>{
        if(value == undefined || value == null || value == "")
            return null;
        else
            return value.format(
                'yyyy-MM-DD HH:mm:ss',
            );
    }

    const submit = (values) => {

        if(values.shiWenLiXueXingNeng_CeShiShiJian1!= null && values.shiWenLiXueXingNeng_CeShiShiJian1!= undefined)
            values.shiWenLiXueXingNeng_CeShiShiJian1 = values["shiWenLiXueXingNeng_CeShiShiJian1"].format('yyyy-MM-DD HH:mm:ss');
        if(values.shiWenLiXueXingNeng_CeShiShiJian2!= null && values.shiWenLiXueXingNeng_CeShiShiJian2!= undefined)
            values.shiWenLiXueXingNeng_CeShiShiJian2 = values["shiWenLiXueXingNeng_CeShiShiJian2"].format('yyyy-MM-DD HH:mm:ss');
        if(values.gaoWenLiXueXingNeng_CeShiShiJian1!= null && values.gaoWenLiXueXingNeng_CeShiShiJian1!= undefined)
            values.gaoWenLiXueXingNeng_CeShiShiJian1 = values["gaoWenLiXueXingNeng_CeShiShiJian1"].format('yyyy-MM-DD HH:mm:ss');
        if(values.gaoWenLiXueXingNeng_CeShiShiJian2!= null && values.gaoWenLiXueXingNeng_CeShiShiJian2!= undefined)
            values.gaoWenLiXueXingNeng_CeShiShiJian2 = values["gaoWenLiXueXingNeng_CeShiShiJian2"].format('yyyy-MM-DD HH:mm:ss');

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
                // self.setState({
                //     neiBuZhiLiang_hanjiexiaoguo: `${getBaseUrl()}/api/file/download?fileName=${
                //         info.file.response.data
                //         }`,
                // });
                //
                // // @ts-ignore
                // self.formRef.current.setFieldsValue({
                //     neiBuZhiLiang_hanjiexiaoguo: `${getBaseUrl()}/api/file/download?fileName=${
                //         info.file.response.data
                //         }`,
                // });
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

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

    return (
        <PageContainer>
            <Form form={form} name="control-ref" onFinish={submit} {...formItemLayout}>
                <Card title="激光焊接特征参数录入">
                    <Form.Item name="id" hidden={true}><Input/></Form.Item>
                    <Form.Item {...itemLayout} label="焊接材料:">
                        <Input.Group compact>
                            <Form.Item name="hanJieCaiLiao" rules={[{ required: true }]}>
                                <Radio.Group onChange={(v)=>changeRadio("hanJieCaiLiao", v.target.value)} disabled={disable}>
                                    <Radio value="铝合金">铝合金</Radio>
                                    <Radio value="钛合金">钛合金</Radio>
                                    <Radio value="高温合金">高温合金</Radio>
                                    <Radio value="不锈钢">不锈钢</Radio>
                                    <Radio value="金属间化合物">金属间化合物</Radio>
                                    <Radio value="其他">其他</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="hanJieCaiLiaoOther" rules={[{ required: false }]}>
                                <Input placeholder="" disabled={hanJieCaiLiao_disable} />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item {...itemLayout} name="jieTouXingShi" label="接头形式:">
                        <Input.Group compact>
                            <Form.Item name="jieTouXingShi" rules={[{ required: true }]}>
                                <Radio.Group
                                    className="jieTouXingShi"
                                    onChange={(v)=>changeRadio("jieTouXingShi", v.target.value)}
                                    disabled={disable}
                                >
                                    <Radio value="对接接头">对接接头</Radio>
                                    <Radio value="锁底对接接头">锁底对接接头</Radio>
                                    <Radio value="T型接头">T型接头</Radio>
                                    <Radio value="角接接头">角接接头</Radio>
                                    <Radio value="搭接接头">搭接接头</Radio>
                                    <Radio value="其他">其他</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="jieTouXingShiOther" rules={[{ required: false }]}>
                                <Input placeholder="" disabled={jieTouXingShi_disable} />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                {...itemTwoLayout}
                                name="muCaiHouDu"
                                label="母材厚度:"
                                rules={[{ required: false }]}
                            >
                                <Input
                                    placeholder="焊接母材厚度，其中锁底对接接头母材厚度输入格式为XX+XX"
                                    disabled={disable}
                                />
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

                    <Divider orientation="left" plain>
                        &nbsp;装配特征&nbsp;
                    </Divider>
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="zhuangPeiTeZheng_DuiJieJianXi"
                                label="对接间隙:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="mm" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="zhuangPeiTeZheng_SuoDiJianXi"
                                label="锁底间隙:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="mm" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="zhuangPeiTeZheng_JieCha"
                                label="阶差:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="mm" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="zhuangPeiTeZheng_Other"
                                label="其他:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="其它（自定义填写）" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider orientation="left" plain />
                    <Form.Item {...itemLayout} name="jiGuangHanJieFangFa" label="激光焊接方法:">
                        <Input.Group compact>
                            <Form.Item name="jiGuangHanJieFangFa" rules={[{ required: true }]}>
                                <Radio.Group disabled={disable} onChange={(v)=>changeRadio("jiGuangHanJieFangFa", v.target.value)}>
                                    <Radio value="连续激光焊接">连续激光焊接</Radio>
                                    <Radio value="摆动激光焊接">摆动激光焊接</Radio>
                                    <Radio value="脉冲激光焊接">脉冲激光焊接</Radio>
                                    <Radio value="摆动+脉冲激光焊接">摆动+脉冲激光焊接</Radio>
                                    <Radio value="其他">其他</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="jiGuangHanJieFangFaOther" rules={[{ required: false }]}>
                                <Input placeholder="" disabled={jiGuangHanJieFangFa_disable} />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                    <Divider orientation="left" plain>
                        连续激光焊接
                    </Divider>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                {...itemThreeLayout}
                                name="lianXuJiGuangHan_JiGuangGongLv"
                                label="激光功率:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="W" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                {...itemThreeLayout}
                                name="lianXuJiGuangHan_HanJieSuDu"
                                label="焊接速度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="m/s" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                {...itemThreeLayout}
                                name="lianXuJiGuangHan_LiJiaoLiang"
                                label="离焦量:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="mm" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                {...itemThreeLayout}
                                name="lianXuJiGuangHan_CeChuiBaoHuQiTiLiuLiang"
                                label="侧吹保护气体流量:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="L/min" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                {...itemThreeLayout}
                                name="lianXuJiGuangHan_BeiBuBaoHuQiTiLiuLiang"
                                label="背部保护气体流量:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="L/min" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left" plain>
                        摆动激光焊接
                    </Divider>
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongJiGuangHanJie_JiGuangGongLv"
                                label="激光功率:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="W" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongJiGuangHanJie_HanJieSuDu"
                                label="焊接速度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="m/s" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongJiGuangHanJie_BaiDongFangShi"
                                label="摆动方式:"
                            >
                                <Input.Group compact>
                                    <Form.Item
                                        name="baiDongJiGuangHanJie_BaiDongFangShi"
                                        rules={[{ required: false }]}
                                    >
                                        <Select style={{ width: 130 }} disabled={disable} onChange={(v)=>changeRadio("baiDongJiGuangHanJie_BaiDongFangShi", v)}>
                                            <Select.Option value="平行焊缝">∞（平行焊缝）</Select.Option>
                                            <Select.Option value="垂直焊缝">8（垂直焊缝）</Select.Option>
                                            <Select.Option value="Z">Z</Select.Option>
                                            <Select.Option value="自定义">自定义</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="baiDongJiGuangHanJie_BaiDongFangShiOther" rules={[{ required: false }]}>
                                        <Input
                                            placeholder="自定义摆动方式"
                                            style={{ width: 130 }}
                                            disabled={baiDongJiGuangHanJie_BaiDongFangShi_disable}
                                        />
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongJiGuangHanJie_ZhenFu"
                                label="振幅:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="mm" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongJiGuangHanJie_BaiDongPinLv"
                                label="摆动频率:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="Hz" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongJiGuangHanJie_LiJiaoLiang"
                                label="离焦量:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="mm" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongJiGuangHanJie_CeChuiBaoHuQiTiLiuLiang"
                                label="侧吹保护气体流量:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="L/min" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongJiGuangHanJie_BeiBuBaoHuQiTiLiuLiang"
                                label="背部保护气体流量:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="L/min" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left" plain>
                        脉冲激光焊接
                    </Divider>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                {...itemThreeLayout}
                                name="maiChongJiGuangHanJie_JiGuangFengZhiGongLv"
                                label="激光峰值功率:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="W" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                {...itemThreeLayout}
                                name="maiChongJiGuangHanJie_JiGuangJiZhiGongLv"
                                label="激光基值功率:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="W" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                {...itemThreeLayout}
                                name="maiChongJiGuangHanJie_HanJieSuDu"
                                label="焊接速度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="m/s" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                {...itemThreeLayout}
                                name="maiChongJiGuangHanJie_FengZhiMaiChongKuanDu"
                                label="峰值脉冲宽度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="ms" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                {...itemThreeLayout}
                                name="maiChongJiGuangHanJie_JiZhiMaiCHongKuanDu"
                                label="基值脉冲宽度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="ms" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider orientation="left" plain>
                        摆动+脉冲激光焊接
                    </Divider>
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongAndMaiChongJiGuangHanJie_JiGuangFengZhiGongLv"
                                label="激光峰值功率:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="W" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongAndMaiChongJiGuangHanJie_HanJieSuDu"
                                label="焊接速度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="m/s" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongAndMaiChongJiGuangHanJie_ZhenFu"
                                label="振幅:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="mm" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongAndMaiChongJiGuangHanJie_FengZhiMaiChongKuanDu"
                                label="峰值脉冲宽度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="ms" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongAndMaiChongJiGuangHanJie_JiGuangJiZhiGongLv"
                                label="激光基值功率:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="W" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                label="摆动方式:"
                            >
                                <Input.Group compact>
                                    <Form.Item
                                        rules={[{ required: false }]}
                                    >
                                        <Select style={{ width: 150 }} disabled={disable} onChange={(v)=>changeRadio("baiDongAndMaiChongJiGuangHanJie_BaiDongFangShi", v)}>
                                            <Select.Option value="平行焊缝">∞（平行焊缝）</Select.Option>
                                            <Select.Option value="垂直焊缝">8（垂直焊缝）</Select.Option>
                                            <Select.Option value="Z">Z</Select.Option>
                                            <Select.Option value="自定义">自定义</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="baiDongAndMaiChongJiGuangHanJie_BaiDongFangShiOther"
                                        rules={[{ required: false }]}
                                    >
                                        <Input
                                            placeholder="自定义摆动方式"
                                            style={{ width: 150 }}
                                            disabled={baiDongAndMaiChongJiGuangHanJie_BaiDongFangShi_disable}
                                        />
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongAndMaiChongJiGuangHanJie_BaiDongPinLv"
                                label="摆动频率:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="Hz" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="baiDongAndMaiChongJiGuangHanJie_JiZhiMaiChongKuanDu"
                                label="基值脉冲宽度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="ms" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <br />
                </Card>

                <Card title="焊接质量参数录入" style={{ marginTop: 16 }}>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                {...itemTwoLayout}
                                name="hanJieZhiLiang_ZhengMianHanFengYanSe"
                                label="焊缝正面颜色:"
                                rules={[{ required: false }]}
                            >
                                <Radio.Group disabled={disable}>
                                    <Radio value="银白色">银白色</Radio>
                                    <Radio value="黄色">黄色</Radio>
                                    <Radio value="紫色">紫色</Radio>
                                    <Radio value="深蓝色">深蓝色</Radio>
                                    <Radio value="灰色">灰色</Radio>
                                    <Radio value="米色">米色</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                {...itemTwoLayout}
                                name="hanJieZhiLiang_BeiMianHanFengYanSe"
                                label="焊缝背面颜色:"
                                rules={[{ required: false }]}
                            >
                                <Radio.Group disabled={disable}>
                                    <Radio value="银白色">银白色</Radio>
                                    <Radio value="黄色">黄色</Radio>
                                    <Radio value="紫色">紫色</Radio>
                                    <Radio value="深蓝色">深蓝色</Radio>
                                    <Radio value="灰色">灰色</Radio>
                                    <Radio value="米色">米色</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                {...itemTwoLayout}
                                name="hanJieZhiLiang_ZhengMianKuanDu"
                                label="焊缝正面宽度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="mm" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                {...itemTwoLayout}
                                name="hanJieZhiLiang_BeiMianKuanDu"
                                label="焊缝背面宽度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="mm" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                {...itemTwoLayout}
                                name="hanJieZhiLiang_ZhengMianYuGao"
                                label="焊缝正面余高:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="mm" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                {...itemTwoLayout}
                                name="hanJieZhiLiang_BeiMianYuGao"
                                label="焊缝背面余高:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="mm" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="hanJieZhiLiang_BiaoMianQiKongLieWen"
                                label="表面气孔/裂纹:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="hanJieZhiLiang_ShaoChuan"
                                label="烧穿:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable}/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="hanJieZhiLiang_FeiJian"
                                label="飞溅:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="hanJieZhiLiang_HanFengCuoBian"
                                label="焊缝错边:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="mm" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="hanJieZhiLiang_WeiHanTou"
                                label="未焊透:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="hanJieZhiLiang_WeiRongHe"
                                label="未熔合:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" disabled={disable} />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="hanJieZhiLiang_HanFengWeiHanMan"
                                label="焊缝未焊满:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="mm" disabled={disable}/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                {...itemFourLayout}
                                name="hanJieZhiLiang_YaoBianSHenDu"
                                label="咬边深度:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="" suffix="mm" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left" plain>
                        内部质量
                    </Divider>

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                {...itemTwoLayout}
                                name="neiBuZhiLiang_WuSunJianCe"
                                label="无损检测:"
                                rules={[{ required: false }]}
                            >
                                <Radio.Group disabled={disable}>
                                    <Radio value="I级接头">I级接头</Radio>
                                    <Radio value="II级接头">II级接头</Radio>
                                    <Radio value="III级接头">III级接头</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                {...itemTwoLayout}
                                name="neiBuZhiLiang_WuSunJianCeJuTiMiaoShu"
                                rules={[{ required: false }]}
                                label="具体描述"
                            >
                                <Input placeholder="具体描述" disabled={disable} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                {...itemTwoLayout}
                                name="neiBuZhiLiang_rongShen"
                                label="熔深:"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="具体描述" suffix="mm" disabled={disable} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left" plain>
                        焊接效果
                    </Divider>
                    <Row>
                        <Col span={12}>
                            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                                <Upload {...uploadProps} {...itemTwoLayout}>
                                    <Button>Click to Upload</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                {...itemTwoLayout}
                                name="neiBuZhiLiang_hanjiexiaoguo"
                                label="无损检测:"
                                // value={this.state.uploadSrc}
                                rules={[{ required: false }]}
                            >
                                <Image
                                    width={200}
                                    src={neiBuZhiLiang_hanjiexiaoguo}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <br />

                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="力学性能 - 室温力学性能" bordered>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="shiWenLiXueXingNeng_KangLaQiangDu"
                                            label="抗拉强度:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" suffix="MPa" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="shiWenLiXueXingNeng_ZuiDaLi"
                                            label="最大力:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" suffix="N" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="shiWenLiXueXingNeng_DuanHouShenChangLv"
                                            label="断后伸长率:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" suffix="%" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="shiWenLiXueXingNeng_DaJieMianJi"
                                            label="搭接面积:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" suffix="mm^2" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="shiWenLiXueXingNeng_QuFuQiangDu"
                                            label="屈服强度:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" suffix="MPa" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="shiWenLiXueXingNeng_KangJianQiangDu"
                                            label="抗剪强度:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" suffix="MPa" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="shiWenLiXueXingNeng_CeShiShiJian1"
                                            label="测试时间:"
                                            rules={[{ required: false }]}
                                        >
                                            <DatePicker
                                                format="YYYY-MM-DD HH:mm:ss"
                                                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                                disabled={disable}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="shiWenLiXueXingNeng_CeShiShiJian2"
                                            label="测试时间:"
                                            rules={[{ required: false }]}
                                        >
                                            <DatePicker
                                                format="YYYY-MM-DD HH:mm:ss"
                                                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                                disabled={disable}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="力学性能 - 高温力学性能" bordered>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="gaoWenLiXueXingNeng_CeShiWenDu1"
                                            label="测试温度:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="具体描述" suffix="℃" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="gaoWenLiXueXingNeng_CeShiWenDu2"
                                            label="测试温度:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="具体描述" suffix="℃" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="gaoWenLiXueXingNeng_KangLaQiangDu"
                                            label="抗拉强度:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" suffix="MPa" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="gaoWenLiXueXingNeng_ZuiDaLi"
                                            label="最大力:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" suffix="N" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="gaoWenLiXueXingNeng_QuFuQiangDu"
                                            label="屈服强度:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" suffix="MPa" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="gaoWenLiXueXingNeng_DaJieMianJi"
                                            label="搭接面积:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" suffix="mm^2" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="gaoWenLiXueXingNeng_DuanHouShenChangLv"
                                            label="断后伸长率:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" suffix="%" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="gaoWenLiXueXingNeng_KangJianQiangDu"
                                            label="抗剪强度:"
                                            rules={[{ required: false }]}
                                        >
                                            <Input placeholder="" suffix="MPa" disabled={disable} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="gaoWenLiXueXingNeng_CeShiShiJian1"
                                            label="测试时间:"
                                            rules={[{ required: false }]}
                                        >
                                            <DatePicker
                                                format="YYYY-MM-DD HH:mm:ss"
                                                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                                disabled={disable}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            {...itemHalfTwoLayout}
                                            name="gaoWenLiXueXingNeng_CeShiShiJian2"
                                            label="测试时间:"
                                            rules={[{ required: false }]}
                                        >
                                            <DatePicker
                                                format="YYYY-MM-DD HH:mm:ss"
                                                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                                disabled={disable}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Card title="基础信息" bordered>
                                <Col span={12}>
                                    <Form.Item
                                        {...itemTwoLayout}
                                        name="shujutigongren"
                                        label="数据提供者:"
                                        rules={[{ required: false }]}
                                    >
                                        <Input placeholder="" disabled={disable} />
                                    </Form.Item>
                                </Col>
                            </Card>
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
        </PageContainer>
    );
}

// export default Demo;
