import { Layout } from 'antd';
import * as S from './styles'
import Image from 'next/image'
import { useEffect, useState } from 'react';
const { Header, Content } = Layout;

export type User = {
  conciliador: string
  email: string
  extensaoLogo: string | null
  id: number
  img: string
  nomeArquivoLogo: string | null
  password: string
  powerBi: string
  tipoDeUsuario: number
}

function Home() {
  const [user, setUser] = useState<any>()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUser: any | string = JSON.parse(window.localStorage.getItem('cliente') || '{}')
      setUser(currentUser)
    } else {
    }
  }, [])
  return (
    <Layout className="layout" >
      <Header
        style={{
          backgroundColor: "#f0f2f5",
          display: 'flex',
          height: "auto",
          maxHeight: "60px",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <S.ContainerImage>
          <img src={`data:image/png;base64,${user?.img}`} alt="logo" />
        </S.ContainerImage>
        <S.ContainerWord>
          Análise de dados
        </S.ContainerWord>
        <S.MenuContainer>
          <span><a target="_blank" rel="noopener noreferrer" href={`${user?.conciliador}`} >CONCILIADOR</a></span>
        </S.MenuContainer>
      </Header>
      <Content style={{ backgroundColor: "white" }}>
        <S.SiteLayoutContent>
          {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
          {user && <S.Iframe title="Dashboard_Brasbol_Recuperado 2" src={user?.powerBi} frameBorder="0" allowFullScreen={true} />}
        </S.SiteLayoutContent>
      </Content>
    </Layout>
  )
}

export default Home;
