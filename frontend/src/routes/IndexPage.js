import React,{PropTypes} from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import {Input,Row,Col,Button} from 'antd';
import JSONTree from 'react-json-tree'
function IndexPage({dispatch,example}) {
  const {data}=example
  let text
  const defaultValue=`
    query{
      products(id: 71){
        id
        title
        category{
          id
          name
          parent{
            id
            name
            children{
              id
              name
            }
          }
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
    <div >
      <h1 className={styles.title}>GraphQL 查询 DEMO</h1>
      <div style={{width:'100%'}}>
        <div style={{width:'40%',float:"left",margin:"0",padding:"0"}}>
          <Input type="textarea" rows={20} style={{width:'100%',margin:"0",padding:"0"}} defaultValue={defaultValue} ref={el=> text = el} />
        </div>
        <div style={{width:'60%',float:'right',margin:"0",padding:"0"}}>
          <JSONTree  data={data} style={{margin:"0",padding:"0"}} />
        </div>
      </div>
      <div style={{width:"100%",float:"left"}}>
        <button type="submit" onClick={handleSubmit}>提交</button>
      </div>

    </div>
  );
}

IndexPage.propTypes = {
  dispatch: PropTypes.func,
  example: PropTypes.object,
};

export default connect(({ example}) => ({ example}))(IndexPage);
