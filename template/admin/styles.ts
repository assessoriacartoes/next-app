import styled from 'styled-components'

export const SiteLayoutContent = styled.div`
  min-height: 280px;
  padding: 40px 30px 24px 24px;
  background: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  @media (min-width: 768px) {
    width: 60%;
  }
}
`

export const ContainerImage = styled.div`
 margin-right: auto;
  margin-left: 10%;
  width: fit-content;
  img{
    width: 160px;
  }
`

export const Iframe = styled.iframe`
  width: 100%;
  height: 100vh;
`

export const HideBar = styled.div`
  z-index: 1000;
  height: 60px;
  transform: translateY(-54px);
  background-color: white;
`

export const ContainerTitle = styled.div`
  text-align: center;
  margin-bottom: 30px;
`

export const FormContainer = styled.div`
  .ant-form-item-label{
    text-align: center;
  }
`

export const MenuContainer = styled.div`
  span{
    margin - left: 20px;
  }
`
