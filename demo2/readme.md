
# 单页应用demo


## 多个route共用一个组件，当路径切换组件不刷新问题解决办法

当多个路由使用同一个组件的时候，切换路由的时候，页面组件不重新构建，页面也不刷新
当切换路由的时候，只是重新render，并不重新构建，如果需要路由切换的时候，组件重新构建，重新完成一次生命周期，则需要给组件加上key

路由不需要修改，我们只需要修改组件，给组件加上key，让router的path属性（params）指向组件的key，就可以实现，组件的重构

`export default (props)=><User {...props} key={props.location.pathname} />`



## fileUpload的坑

fileList设置方式，及重置方式
```javascript
const ListCardList = () => {

    const [fileList, setFileList] = useState([]);
    const [uploaded, setUploaded] = useState("");//保存文件上传结果

    //如希望重置fileList，可调用此函数
    const reset = () => {
            setFileList([]);
        };
    
    const uploadProps = {
            name: 'file',
            action: `${api.getBaseUrl()}/api/file/upload`,
            // disabled: disable,
            data: (file) => ({
                uploadFile: file,
                // description: 'dsada',
                name: file.name,
            }),
            fileList: fileList,
            listType: 'picture',
            onChange(info) {
                //注意，此处必须要设置fileList，不然永远都不会进入done事件
                setFileList(info.fileList);
                
                //onChange事件处理，done为完成事件，还有uloading事件等
                if (info.file.status === 'done') {//done
                    message.success(`${info.file.name} file uploaded successfully`);
    
                    var url = `${api.getBaseUrl()}/api/file/download?fileName=${info.file.response.data}`;
                    console.log("uploaded:" + url);
    
                    setUploaded(info.file.response.data);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
    
    return (
        <Upload {...uploadProps}>
            <Button>上传文件</Button>
        </Upload>);
}
```