import React,{PropTypes} from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import {Input,Row,Col,Button} from 'antd';

function IndexPage({dispatch,example}) {
  const {data}=example
  let text
  const defaultValue=`
    query{
      products(id: 1){
        id
        title
        category{
          id
          name
        }
      }
    }`
  function handleSubmit(){
    console.log(text)
    const {value}=text.refs.input
    console.log(value)
    dispatch({
      type: 'example/fetch',
      payload:{
        query:value
      }
    })
  }

  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>GraphQL 查询 DEMO</h1>
      <Row type="flex">
        <Col span={10}>
          <Input type="textarea" rows={20} defaultValue={defaultValue} style={{width:'60%'}} ref={el=> text = el} />
          <Button type="default" onClick={handleSubmit}>提交</Button>
        </Col>
        <Col span={10}>
          <Input type="textarea" rows={40} style={{width:'80%'}} value={`${JSON.stringify(data)}`}/></Col>
      </Row>
    </div>
  );
}

IndexPage.propTypes = {
  dispatch: PropTypes.func,
  example: PropTypes.object,
};

export default connect(({ example}) => ({ example}))(IndexPage);
