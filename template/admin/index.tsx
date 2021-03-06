import React, { useEffect, useState } from 'react';
import {
  Spin,
  Layout,
  Breadcrumb,
  Typography,
  Upload,
  Form,
  Input,
  Button
} from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify'
import Image from 'next/image'
import Table from '../../components/Table'

import api from '../../service/api'
import * as S from './styles'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Title } = Typography;
const { Header, Content } = Layout;

export type SaveNewClientForm = {
  email: string,
  password: string,
  powerBi: string,
  clientImage: any,
  img: any,
  id: any
}

const Admin: any = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [cliente, setCliente] = useState<SaveNewClientForm | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false)
  const [indexArray, setIndexArray] = useState<any>()

  async function onFinish(values: SaveNewClientForm) {
    const bi = values.powerBi.split('"')
    const urlYoutube = values.powerBi.replace('src="', 'next ')
    const temporario = urlYoutube.split(' ')
    temporario.forEach((elemento, index) => {
      if (elemento === "next") {
        values.powerBi = temporario[index + 1].replace('"', '')
      }
    })

    setIsSpinning(true)
    await api.post(`/api/cliente`, values).then(function (response: any) {
      SaveLogo(response.data.cliente.id)
    }).catch(function (error: any) {
      toast.error(`Um erro inesperado aconteceu ${error.response?.status}`)
    });
  };

  async function SaveLogo(id: any) {
    const archive = new FormData();
    archive.append("arquivo", selectedFile);

    await api.post(`/api/cliente/uploadLogo/${id}`, archive)
      .then(function (response: any) {
        setIsSpinning(false)
        window.location.reload();
        toast.success(`Cliente criado com sucesso`)
        setCliente(response.data);

      }).catch(function (error: any) {
        toast.error(`Um erro inesperado aconteceu ${error.response?.status}`)
      });
  }

  const handleupload = (file: any, fileList: any) => {
    setSelectedFile(file);
  }

  const [user, setUser] = useState<any>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUser: any | string = JSON.parse(window.localStorage.getItem('cliente') || '{}')
      setUser(currentUser)
    } else {
    }
  }, [])

  const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#2ce414" }} spin />

  return (
    <Spin indicator={antIcon} spinning={isSpinning}>
      <Layout className="layout">
        <header
          style={{
            backgroundColor: "#f0f2f5",
            display: 'flex',
            height: "auto",
            maxHeight: "60px",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <div style={{
            marginRight: "auto",
            marginLeft: "10%",
            width: "fit-content"
          }}>
            <Image width={160} height={40} src="/assessoria.png" alt="logo" />
          </div>
        </header>
        <main style={{ backgroundColor: "white", padding: '50px 50px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          </Breadcrumb>
          <div style={{
            minHeight: "280px",
            padding: "40px 30px 24px 24px",
            width: "600px",
            background: "#fff",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            marginBottom: "20px",

          }}>
            <S.ContainerTitle>
              <Title level={3}>Cadastre um novo cliente</Title>
            </S.ContainerTitle>
            <div>
              <Form {...layout} name="nest-messages" style={{ textAlign: "center" }} onFinish={(values) => onFinish(values)} >
                <Form.Item
                  name='email'
                  label="E-mail"
                  rules={[{ required: true, message: 'Por favor insira o E-mail' }]}
                >
                  <Input type="text" />
                </Form.Item>
                <Form.Item
                  name='password'
                  label="Senha"
                  rules={[{ required: true, message: 'Por favor insira a senha' }]}
                >
                  <Input type="password" />
                </Form.Item>

                <Form.Item
                  name='powerBi'
                  label="Power BI"
                  rules={[{ required: true, message: 'Por favor insira o Power Bi' }]}
                >
                  <Input type="text" />
                </Form.Item>
                <Form.Item
                  name='conciliador'
                  label="Link Conciliador"
                  rules={[{ required: true, message: 'Por favor insira o Link Do Conciliador' }]}
                >
                  <Input type="text" />
                </Form.Item>
                <Form.Item
                  name='clientImage'
                  label="Imagem Cliente"
                  rules={[{ required: true, message: 'Por favor insira uma imagem' }]}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end"
                  }}
                >
                  <Upload
                    listType="picture"
                    beforeUpload={handleupload}
                    accept=".png"
                  >
                    <Button icon={<UploadOutlined />}>Upload </Button>
                  </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    salvar
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <Table />
        </main>
      </Layout>
    </Spin>

  )
}

export default Admin