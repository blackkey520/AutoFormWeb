
import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Select,
  Form, Input, Button, Tabs,
  Table, Popconfirm
} from 'antd';
import styles from './index.less';
import Result from '@/components/Result';
import EditTable from '../../../components/EditTable/'

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
export default
@connect(({ datasourceconfig }) => ({
  selectdatasource: datasourceconfig.selectdatasource
}))
@Form.create()
class Info extends Component {
      
 

  render() {
    const { selectdatasource,form: { getFieldDecorator }, } = this.props;
    const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 12 }
		};
    if (selectdatasource!==null)
    {
        return (
          <div>
            <Tabs tabBarExtraContent={<div className={styles.title}>{`${selectdatasource.DT_NAME_CN}(${selectdatasource.DT_CONFIG_ID})`}</div>}>
              <TabPane tab="数据源信息" key="1"><div className={styles.baseView} ref={this.getViewDom}>
                <div className={styles.left}>
                  <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
                    <FormItem {...formItemLayout} label="配置ID">
                      {getFieldDecorator('DT_CONFIG_ID', {
                      initialValue: selectdatasource.DT_CONFIG_ID,
                rules: [
                  {
                    required: true,
                    message: '请填写配置ID',
                  },
                ],
              })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="表名">
                      {getFieldDecorator('DT_NAME', {
                      initialValue: selectdatasource.DT_NAME,
                rules: [
                  {
                    required: true,
                    message: '请填写表名',
                  },
                ],
              })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="表名（中文）">
                      {getFieldDecorator('DT_NAME_CN', {
                      initialValue: selectdatasource.DT_NAME_CN,
                rules: [
                  {
                    required: true,
                    message: '请填写表名（中文）',
                  },
                ],
              })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="备注">
                      {getFieldDecorator('DT_REMARK', {
                      initialValue: selectdatasource.DT_REMARK,
                rules: [],
              })(
                <Input.TextArea
                  placeholder="此处填写备注"
                  rows={4}
                />
              )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="排序字段">
                      {getFieldDecorator('DT_ORDER', {
                      initialValue: selectdatasource.DT_ORDER,
                rules: [],
              })(
                <Select style={{ maxWidth: 220 }} />
              )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="主键字段">
                      {getFieldDecorator('DT_PRIMARYKEY', {
                      initialValue: selectdatasource.DT_PRIMARYKEY,
                rules: [],
              })(
                <Select style={{ maxWidth: 220 }} />
              )}
                    </FormItem>
                   
                    <FormItem {...formItemLayout} label="静态查询">
                      {getFieldDecorator('DT_STATICQUERY', {
                      initialValue: selectdatasource.DT_STATICQUERY,
                rules: [],
              })(<Input.TextArea
                placeholder="此处填写备注"
                rows={4}
              />)}
                    </FormItem>
                    <Button type="primary">
                    保存
                    </Button>
                  </Form>
                </div>
              </div>
              </TabPane>
              <TabPane tab="字段配置" key="2"><EditTable /></TabPane>
              <TabPane tab="其他配置" key="3">Content of tab 3</TabPane>
            </Tabs>,
            
            
          </div>
            );
    }
    
         return (
           <Result
             type="error"
             title="请选择数据源"
             description="请从左侧选择您想编辑的数据源"
             style={{ marginTop: 150, marginBottom: 150 }}
           />
            );
    
  }
}
