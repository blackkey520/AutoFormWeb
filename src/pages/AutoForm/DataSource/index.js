import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {
  Select
} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './index.less';
import DataSourceList from './DataSourceList';
import DataSourceDetail from './DataSourceDetail';
const Option = Select.Option;

export default
@connect(({ dbconfig,datasourceconfig }) => ({
  dblist: dbconfig.dblist,
  selectdatasource: datasourceconfig.selectdatasource
}))
class Info extends Component {
   constructor(props) {
    super(props);
    
    this.state = {
      selectDBItem: props.dblist[0] ? props.dblist[0].DB_KEY : 'none',
    };
  }

componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dbconfig/fetch',
      payload: {},
    });
  }

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = ({ key }) => {
    router.push(`/account/settings/${key}`);
    this.setState({
      selectKey: key,
    });
  };
 

  render() {
    const { children,dblist,selectdatasource } = this.props;
    
    let {selectDBItem}=this.state;
    if (dblist.length !== 0 && selectDBItem==='none')
    {   
        selectDBItem = dblist[0].DB_KEY;
    }
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={ref => {
            this.main = ref;
          }}
        >
          <div className={styles.leftmenu}>
            <Select
              value={selectDBItem}
              style={{ width: '90%',marginLeft:'5%' }}
              onChange={(value)=>{
                this.setState({
                    selectDBItem:value
                });
                const { dispatch } = this.props;
                 dispatch({
                   type: 'datasourceconfig/fetch',
                   payload: {
                     DT_CONN: value
                   },
                 });
            }}
            >
              {
                    dblist.map((item,key)=>(<Option key={item.DB_KEY} value={item.DB_KEY}>{item.DB_NAME}</Option>))
              }
            </Select>
            <DataSourceList DT_CONN={selectDBItem} />
          </div>
          <div className={styles.right}>
            <DataSourceDetail />
          </div>
        </div>
      </GridContent>
    );
  }
}
