import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'dva';
import {
  List,
  Input,
  Button,
  Avatar,
  Modal,
  Form,
  Select,
} from 'antd';

import Result from '@/components/Result';

import styles from './index.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;
const { TextArea } = Input;

export default
@connect(({ datasourceconfig, loading }) => ({
  datasourcelist: datasourceconfig.datasourcelist,
  loading: loading.models.dblist,
}))
@Form.create()
class DataSourceList extends PureComponent {
  state = { visible: false, done: false };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  
  showModal = () => {
    this.setState({
      visible: true,
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
    const { dispatch, form,DT_CONN } = this.props;

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'datasourceconfig/submit',
        payload: { ...fieldsValue,DT_CONN },
      });
    });
  };

  

  render() {
    const {
      datasourcelist,
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
      dispatch
    } = this.props;
    const { visible, done } = this.state;
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };
 
    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="数据源添加成功"
            actions={
              <Button type="primary" onClick={this.handleDone}>
                去配置字段
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="配置编号" {...this.formLayout}>
            {getFieldDecorator('DT_CONFIG_ID', {
              rules: [{ required: true, message: '请输入配置编号' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="数据源名称" {...this.formLayout}>
            {getFieldDecorator('DT_NAME', {
              rules: [{ required: true, message: '请输入数据源名称' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="数据源名称（中文）" {...this.formLayout}>
            {getFieldDecorator('DT_NAME_CN', {
              rules: [{ required: true, message: '请输入数据源名称（中文）' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem {...this.formLayout} label="备注">
            {getFieldDecorator('DT_REMARK', {
              rules: [{ message: '请输入至少五个字符的备注信息！', min: 5 }],
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem>
        </Form>
      );
    };
    return (
      <div className={styles.standardList} style={{marginTop:15}}>
          
        <Button
          type="dashed"
          style={{ width: '90%', marginLeft:'5%',marginBottom: 8 }}
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
          dataSource={datasourcelist}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                style={{marginLeft:15 }}
                title={<a onClick={()=>{
                  dispatch({
                    type: 'datasourceconfig/selectdatasource',
                    payload: {item},
                  });
                  }}
                >{item.DT_NAME_CN}
                </a>}
                description={item.DT_CONFIG_ID}
              />
            </List.Item>
              )}
        /> 
        <Modal
          title={done ? null : `数据源配置添加`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </div>
    );
  }
}
