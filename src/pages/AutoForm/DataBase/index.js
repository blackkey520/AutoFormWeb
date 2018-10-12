import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './index.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;
const { TextArea } = Input;

export default
@connect(({ dbconfig, loading }) => ({
  dblist: dbconfig.dblist,
  loading: loading.models.dblist,
}))
@Form.create()
class DBList extends PureComponent {
  state = { visible: false, done: false };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dbconfig/fetch',
      payload: {},
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const DB_KEY = current ? current.DB_KEY : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'dbconfig/submit',
        payload: { DB_KEY, ...fieldsValue },
      });
    });
  };

  deleteItem = DB_KEY => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dbconfig/submit',
      payload: { DB_KEY },
    });
  };

  render() {
    const {
      dblist,
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };
 
    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="数据库添加成功"
            actions={
              <Button type="primary" onClick={this.handleDone}>
                去配置数据源
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="数据库名称" {...this.formLayout}>
            {getFieldDecorator('DB_NAME', {
              rules: [{ required: true, message: '请输入数据库名称' }],
              initialValue: current.DB_NAME,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="数据库类型" {...this.formLayout}>
            {getFieldDecorator('DB_VERSION', {
              rules: [{
                required: true,
                message: '请选择数据库类型'
              }],
              initialValue: current.DB_VERSION,
            })(
              <Select placeholder="请选择">
                <SelectOption value="MySql">MySql</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem label="服务器IP" {...this.formLayout}>
            {getFieldDecorator('DB_IP', {
              rules: [{ required: true, message: '请输入服务器IP' }],
              initialValue: current.DB_IP,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="服务器用户名" {...this.formLayout}>
            {getFieldDecorator('DB_USERNAME', {
              rules: [{ required: true, message: '请输入服务器用户名' }],
              initialValue: current.DB_USERNAME,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="服务器密码" {...this.formLayout}>
            {getFieldDecorator('DB_PWD', {
              rules: [{ required: true, message: '请输入服务器密码' }],
              initialValue: current.DB_PWD,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...this.formLayout} label="备注">
            {getFieldDecorator('DB_MARK', {
              rules: [{ message: '请输入至少五个字符的备注信息！', min: 5 }],
              initialValue: current.DB_MARK,
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem>
        </Form>
      );
    };
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
         
          <Card
            className={styles.listCard}
            bordered={false}
            title="数据库配置列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
              onClick={this.showModal}
              ref={component => {
                /* eslint-disable */
                this.addBtn = findDOMNode(component);
                /* eslint-enable */
              }}
            >
              添加
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              dataSource={dblist}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a
                      onClick={e => {
                        e.preventDefault();
                        this.showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <a
                      onClick={e => {
                        Modal.confirm({
                          title: '删除任务',
                          content: '确定删除该任务吗？',
                          okText: '确认',
                          cancelText: '取消',
                          onOk: () => this.deleteItem(item.DB_KEY),
                        });
                      }}
                    >
                      删除
                    </a>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.DB_VERSION==='MySql'?'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537248042049&di=f751edb0570ea2324a3d0c25bf269411&imgtype=0&src=http%3A%2F%2Fwww.linuxeye.com%2Fuploads%2Fallimg%2F150605%2F1-150605092ZYZ.png':''} shape="square" size="large" />}
                    title={<a>{item.DB_NAME}</a>}
                    description={item.DB_MARK}
                  />
                  <div className={styles.listContent}>
                    <div className={styles.listContentItem}>
                      <span>{`服务器地址:${item.DB_IP}`}</span>
                      <p>{`用户名/密码:${item.DB_USERNAME}/${item.DB_PWD}`}</p>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </div>
        <Modal
          title={done ? null : `数据库配置${current ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
