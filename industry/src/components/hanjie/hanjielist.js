import { Button, Card, Col, Input, Layout, message, Radio, Row, Table, Upload, BackTop, Modal  } from 'antd';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import { PageContainer } from '@ant-design/pro-layout';
import PageContainer from "./layout.js"

import { DownloadOutlined,UploadOutlined,PlusOutlined,ZoomInOutlined,EditOutlined,DeleteOutlined,SearchOutlined } from '@ant-design/icons';

const getBaseUrl = () =>{
    return "http://localhost:8080"
}

const Uploading = props =>{

    const uploadProps = {
        name: 'file',
        action: `${getBaseUrl()}/api/indus/uploadExcel`,
        data: (file) => ({
            uploadFile: file,
        }),
        listType: 'text',
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} 文件上传导入成功`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 文件上传导入失败.`);
            }
        },
    };

    const handleAdd = () => {
        history.push({
            pathname: '/list/add',
        });
    };

    return (
        <>
            <Button name="add" onClick={() => handleAdd()} icon={<PlusOutlined />}>
                新增记录
            </Button>
            <Upload {...uploadProps}>
                <Button icon={<UploadOutlined/>}>批量导入</Button>
            </Upload>
        </>
    );
}

const style = {
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

export default function(fields){
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [caiLiaoPaiHao, setCaiLiaoPaiHao] = useState('');
    const [hanJieCaiLiao, setHanJieCaiLiao] = useState('');
    const [jieTouXingShi, setJieTouXingShi] = useState('');
    const [muCaiHouDu, setMuCaiHouDu] = useState('');
    const [jiGuangHanJieFangFa, setJiGuangHanJieFangFa] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [importStart, setImportStart] = useState(0);
    const [importCount, setImportCount] = useState(300);

    useEffect(() => {
        getData();
    }, []);

    const handleView = (id) => {
        console.log("handleView" + id);
        // history.push(`/list/view?id=${id}`);
    };

    const handleEdit = (id) => {
        console.log("handleEdit" + id);
        // history.push(`/list/edit?id=${id}`);
    };

    const handleDelete = (id) =>{
        console.log("handleDelete" + id);
        // removeData({ id }).then((res) => {
        //     const { status, description } = res;
        //
        //     if (status === 200) {
        //         message.success('删除成功');
        //         self.getData();
        //     } else {
        //         message.success(`删除失败:${description}`);
        //     }
        // });
    };

    const columns = [
        {
            title: '主键',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: '焊接材料',
            dataIndex: 'hanJieCaiLiao',
            key: 'hanJieCaiLiao',
        },
        {
            title: '材料排号',
            dataIndex: 'caiLiaoPaiHao',
            key: 'caiLiaoPaiHao',
        },
        {
            title: '焊接方法',
            dataIndex: 'jiGuangHanJieFangFa',
            key: 'jiGuangHanJieFangFa',
        },
        {
            title: '接头形式',
            dataIndex: 'jieTouXingShi',
            key: 'jieTouXingShi',
        },
        {
            title: '母材厚度',
            dataIndex: 'muCaiHouDu',
            key: 'muCaiHouDu',
            sorter: (a, b) => a.muCaiHouDu - b.muCaiHouDu,
        },
        {
            title: '室温抗拉强度',
            dataIndex: 'shiWenKangLaQiangDu',
            key: 'shiWenKangLaQiangDu',
            sorter: (a, b) => a.shiWenKangLaQiangDu - b.shiWenKangLaQiangDu,
        },
        {
            title: '焊接质量',
            dataIndex: 'hanJieZhiLIang',
            key: 'hanJieZhiLIang',
        },
        {
            title: '上传时间',
            dataIndex: 'update_time',
            key: 'update_time',
            render: (val) => {
                return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '';
            },
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'action',
            render: (text, record) => {
                return (
                    <div>
                        <Button name="view" onClick={() => handleView(record.id)} icon={<ZoomInOutlined />}>
                            查看
                        </Button>
                        <Button name="delete" onClick={() => handleEdit(record.id)} icon={<EditOutlined />}>
                            编辑
                        </Button>{' '}
                        <Button name="delete" onClick={() => handleDelete(record.id)} icon={<DeleteOutlined />}>
                            删除
                        </Button>
                    </div>
                );
            },
        },
    ];

    const onChange = (value, key) => {
        if(key == "hanJieCaiLiao")
            setHanJieCaiLiao(value);
        if(key == "jieTouXingShi")
            setJieTouXingShi(value);
        if(key == "muCaiHouDu")
            setMuCaiHouDu(value);
        if(key == "jiGuangHanJieFangFa")
            setJiGuangHanJieFangFa(value);
        if(key == "caiLiaoPaiHao")
            setCaiLiaoPaiHao(value);
    };

    useEffect(() => {
        getData();
    },[hanJieCaiLiao, jieTouXingShi, muCaiHouDu, jiGuangHanJieFangFa, caiLiaoPaiHao]);

    const batchDownload = () => {
        console.log('批量下载' + importStart + ' ' + importCount);
        const url = `${getBaseUrl()}/api/indus/exportExcel?hanJieCaiLiao=` + hanJieCaiLiao + "&jieTouXingShi=" + jieTouXingShi + "&muCaiHouDu=" + muCaiHouDu + "&hanJieFangFa=" + jiGuangHanJieFangFa + "&caiLiaoPaiHao=" + caiLiaoPaiHao + "&start=" + importStart + "&count=" + importCount;
        // const param = {
        //   caiLiaoPaiHao: this.state.cailiaopaihao,
        //   hanJieCaiLiao: this.state.hanjiecailiao,
        //   jieTouXingShi: this.state.jietouxingshi,
        //   muCaiHouDu: this.state.mucaihoudu,
        //   hanJieFangFa: this.state.hanjiexingshi,
        // };
        // download(url, '批量导出.xlsx');
        // handleCancel();
    }

    const handleCancel = () => {
        setShowModal(false)
    }

    const handleShowModal = () => {
        setShowModal(true);
    };

    const downloadTemplate = () => {
        console.log('下载开始');
        const url = `${getBaseUrl()}/api/file/getTemplate`;
        // download(url, '模板.xlsx');
    };

    const getData = (curPage, curPageSize) => {
        const params = {
            dbType: 1,
            page: curPage ? curPage - 1 : page - 1,
            pageSize: curPageSize || pageSize,
            caiLiaoPaiHao: caiLiaoPaiHao,
            hanJieCaiLiao: hanJieCaiLiao,
            jieTouXingShi: jieTouXingShi,
            muCaiHouDu: muCaiHouDu,
            jiGuangHanJieFangFa: jiGuangHanJieFangFa,
        };

        axios.post("http://127.0.0.1:8080/api/indus/query", {...params}).then(response => {
            const { total, data } = response.data;
            setData(data);
            setTotal(total);
        }).catch(error => console.log(`Save failed1 : (${error})`));
    };

    const changePageSize = (pageSize, current) => {
        setPageSize(pageSize);
        // getData(current, pageSize);
    };

    const changePage = (current) => {
        setPage(current);
        // getData(current);
    };

    const paginationProps = {
        showSizeChanger: true,
        showQuickJumper: false,
        showTotal: () => `共${total}条`,
        pageSize,
        current: page,
        total,
        onShowSizeChange: (current, size) => changePageSize(size, current),
        onChange: (current) => changePage(current),
    };

    useEffect(() => {
        getData();
    },[pageSize, page])

    return (
        <PageContainer>
            <Card>
                <Row>
                    <Col span={16}>
                        <Radio.Group defaultValue={hanJieCaiLiao} onChange={(e) => {onChange(e.target.value, "hanJieCaiLiao")}}>
                            <Radio.Button value="">全部</Radio.Button>
                            <Radio.Button value="铝合金">铝合金</Radio.Button>
                            <Radio.Button value="钛合金">钛合金</Radio.Button>
                            <Radio.Button value="高温合金">高温合金</Radio.Button>
                            <Radio.Button value="不锈钢">不锈钢</Radio.Button>
                            <Radio.Button value="金属间化合物">金属间化合物</Radio.Button>
                            <Radio.Button value="其他">其他</Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col span={8}>
                        {/* <Button name="search" onClick={() => this.getData()}>
              搜索
            </Button> */}
                        <Button name="download" icon={<DownloadOutlined />}
                                onClick={() => {
                                    downloadTemplate();
                                }}
                        >
                            下载模板
                        </Button>
                        <Uploading />
                        <Button name="import" icon={<DownloadOutlined />}
                                onClick={handleShowModal}
                            // onClick={() => {
                            //   this.batchDownload();
                            // }}
                        >
                            批量下载
                        </Button>

                        <Modal title="导出选项" visible={showModal} onOk={batchDownload} onCancel={handleCancel}>
                            <Col>
                                <Row>
                                    <Input
                                        addonBefore="导出偏移"
                                        value={importStart}
                                        style={{ width: 300, marginBottom: 16 }}
                                        placeholder="导出偏移量"
                                        onChange={(e)=> { setImportStart(e.target.value)}}
                                    />
                                </Row>
                                <Row>
                                    <Input
                                        addonBefore="导出总数"
                                        value={importCount}
                                        style={{ width: 300, marginBottom: 16 }}
                                        placeholder="导出总数"
                                        onChange={(e)=> { setImportCount(e.target.value)}}
                                    />
                                </Row>
                            </Col>
                        </Modal>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span={24}>
                        <Radio.Group defaultValue={jieTouXingShi} onChange={(e) => {onChange(e.target.value, "jieTouXingShi")}}>
                            <Radio.Button value="">全部</Radio.Button>
                            <Radio.Button value="对接接头">对接接头</Radio.Button>
                            <Radio.Button value="锁底对接接头">锁底对接接头</Radio.Button>
                            <Radio.Button value="T型接头">T型接头</Radio.Button>
                            <Radio.Button value="角接接头">角接接头</Radio.Button>
                            <Radio.Button value="搭接接头">搭接接头</Radio.Button>
                            <Radio.Button value="其他">其他</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col span={24}>
                        <Radio.Group defaultValue={muCaiHouDu} onChange={(e) => {onChange(e.target.value, "muCaiHouDu")}}>
                            <Radio.Button value="">全部</Radio.Button>
                            <Radio.Button value="0.5">0.5</Radio.Button>
                            <Radio.Button value="1">1</Radio.Button>
                            <Radio.Button value="1.5">1.5</Radio.Button>
                            <Radio.Button value="2">2</Radio.Button>
                            <Radio.Button value="2.5">2.5</Radio.Button>
                            <Radio.Button value="3">3</Radio.Button>
                            <Radio.Button value="4">4</Radio.Button>
                            <Radio.Button value="5">5</Radio.Button>
                            <Radio.Button value="6">6</Radio.Button>
                            <Radio.Button value="7">7</Radio.Button>
                            <Radio.Button value="8">8</Radio.Button>
                            <Radio.Button value="9">9</Radio.Button>
                            <Radio.Button value="10">10</Radio.Button>
                            <Radio.Button value="其他">其他</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Radio.Group defaultValue={jiGuangHanJieFangFa} onChange={(e) => {onChange(e.target.value, "jiGuangHanJieFangFa")}}>
                        <Radio.Button value="">全部</Radio.Button>
                        <Radio.Button value="连续激光焊接">连续激光焊接</Radio.Button>
                        <Radio.Button value="摆动激光焊接">摆动激光焊接</Radio.Button>
                        <Radio.Button value="脉冲激光焊接">脉冲激光焊接</Radio.Button>
                        <Radio.Button value="摆动+脉冲激光焊接">摆动+脉冲激光焊接</Radio.Button>
                        <Radio.Button value="其他">其他</Radio.Button>
                    </Radio.Group>
                </Row>
                <br />
                <Row>
                    <Input
                        value={caiLiaoPaiHao}
                        style={{ width: 200 }}
                        placeholder="材料牌号"
                        onChange={(e) => {onChange(e.target.value, "caiLiaoPaiHao")}}
                    />
                    <Button name="search" onClick={() => getData()} icon={<SearchOutlined />} type="primary">
                        搜索
                    </Button>
                </Row>
            </Card>
            {/*<Card style={{ marginTop: 16 }}>*/}
                {/*<div id="chart"></div>*/}
            {/*</Card>*/}
            <Card style={{ marginTop: 16 }}>
                <Table columns={columns} dataSource={data} rowKey="id" pagination={paginationProps} />
            </Card>
            <BackTop style={style}>
                <div >返回顶部</div>
            </BackTop>
        </PageContainer>);
}