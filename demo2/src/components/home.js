import React ,{ useState }from 'react'
import { Table, Button } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import Layout from "./layout.js"



const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

const App = withRouter(function(props) {
    // state = {
    //     selectedRowKeys: [], // Check here to configure the default column
    //     loading: false,
    // };

    const [selectedRowKeys, setSelectedRowKeys ] = useState([]);
    const [loading, setLoading ] = useState(false);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (e) => {
                return (<a onClick={() => del(e.name)}>Delete</a>);
            },
        },
    ];

    const del = (e) => {
        console.log(e);
        const {history} = props;
        history.push("/news/newsDetail?name=" + e);
    }

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setLoading(false);
            setSelectedRowKeys([]);
        }, 1000);
    };

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys( selectedRowKeys );
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <Layout><div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={start} disabled={!selectedRowKeys.length > 0} loading={loading}>
                    Reload
                </Button>
                <span style={{ marginLeft: 8 }}>
            {selectedRowKeys.length > 0 ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div></Layout>
    );
});

export default App;