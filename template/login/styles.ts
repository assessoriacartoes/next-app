import styled from 'styled-components'

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-top: 300px;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  border-radius: 4px;
  padding: 24px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  text-align: center;

  .login-form{
    max-width: 300px;
  }
  .login-form-forgot{
    float: right;
  }
  .ant-col-rtl .login-form-forgot{
    float: left;
  }
  .login-form-button {
    width: 100%;
  }
`
