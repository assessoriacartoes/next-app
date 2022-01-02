import { Layout } from 'antd';
import * as S from './styles'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

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

const Home = () => {
  const [user, setUser] = useState<any>()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUser: any | string = JSON.parse(window.localStorage.getItem('user') || '{}')
      console.log(currentUser)
      setUser(currentUser)
    } else {
    }
  }, [])

  return (
    <Layout className="layout" >
      <header
        style={{
          backgroundColor: "#f0f2f5",
          display: 'flex',
          height: "80px",
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
          {user == 1 && <span><a onClick={() => router.push("/admin")}>ADMIN</a></span>}

        </S.MenuContainer>
      </header>
      <Content style={{ backgroundColor: "white" }}>
        <S.SiteLayoutContent>
          {user && <S.Iframe title="Dashboard_Brasbol_Recuperado 2" src={user?.powerBi} frameBorder="0" allowFullScreen={true} />}
        </S.SiteLayoutContent>
      </Content>
    </Layout>
  )
}

export default Home
