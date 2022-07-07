import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
const columns = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: 'Title',
       
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: 'This field is Mandatory',
                },
            ],
        },
    },
    {
        disable: true,
        title: 'State',
        dataIndex: 'state',
        filters: true,
        onFilter: true,
        ellipsis: true,
        valueType: 'select',
        valueEnum: {
            all: { text: 'SuperLong' },
            open: {
                text: 'Unsolved',
                status: 'Error',
            },
            closed: {
                text: 'solved',
                status: 'Success',
                disabled: true,
            },
            processing: {
                text: 'solving',
                status: 'Processing',
            },
        },
    },
    {
        disable: true,
        title: 'Label',
        dataIndex: 'labels',
        search: false,
        renderFormItem: (_, { defaultRender }) => {
            return defaultRender(_);
        },
        render: (_, record) => (<Space>
        {record.labels.map(({ name, color }) => (<Tag color={color} key={name}>
            {name}
          </Tag>))}
      </Space>),
    },
    {
        title: 'Creation Time',
        key: 'showTime',
        dataIndex: 'created_at',
        valueType: 'dateTime',
        sorter: true,
        hideInSearch: true,
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        valueType: 'dateRange',
        hideInTable: true,
        search: {
            transform: (value) => {
                return {
                    startTime: value[0],
                    endTime: value[1],
                };
            },
        },
    },
    {
        title: 'operate',
        valueType: 'option',
        key: 'option',
        render: (text, record, _, action) => [
            <a key="editable" onClick={() => {
                    var _a;
                    (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
                }}>
        Edit
      </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        Check
      </a>,
            <TableDropdown key="actionGroup" onSelect={() => action === null || action === void 0 ? void 0 : action.reload()} menus={[
                    { key: 'copy', name: 'Copy' },
                    { key: 'delete', name: 'Delete' },
                ]}/>,
        ],
    },
];
const menu = (<Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>);
export default () => {
    const actionRef = useRef();
    return (<ProTable columns={columns} actionRef={actionRef} cardBordered request={async (params = {}, sort, filter) => {
            console.log(sort, filter);
            return request('https://proapi.azurewebsites.net/github/issues', {
                params,
            });
        }} editable={{
            type: 'multiple',
        }} columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            onChange(value) {
                console.log('value: ', value);
            },
        }} rowKey="id" search={{
            labelWidth: 'auto',
        }} options={{
            setting: {
                listsHeight: 400,
            },
        }} form={{
           
            syncToUrl: (values, type) => {
                if (type === 'get') {
                    return Object.assign(Object.assign({}, values), { created_at: [values.startTime, values.endTime] });
                }
                return values;
            },
        }} pagination={{
            pageSize: 5,
            onChange: (page) => console.log(page),
        }} dateFormatter="string" headerTitle="Advanced Form" toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary">
                
        </Button>,
            <Dropdown key="menu" overlay={menu}>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
        ]}/>);
};
