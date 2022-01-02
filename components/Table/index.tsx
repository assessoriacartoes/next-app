import { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import 'antd/dist/antd.css';
import * as S from './styles';
import { toast } from 'react-toastify';
import api from '../../service/api';

export type DataTable = {
    email: string
    senha: string
    powerBi: string
    id: number
}

export default function TableSimuled() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    const [trigger, setTrigger] = useState(0)
    const fakeData = [{
        email: 'opa',
        password: 'senhasenha',
        powerBi: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwpowwwwwwwwwwwwwwwwwwwwwwwwwwwwpowwwwwwwwwwwwwwwwwwwwwwwwwwwwpowwwwwwwwwwwwwwwwwwwwwwwwwwwwpowwwwwwwwwwwwwwwwwwwwwwwwwwwwpowwwwwwwwwwwwwwwwwwwwwwwwwwwwpowwwwwwwwwwwwwwwwwwwwwwwwwwwwpowwwwwwwwwwwwwwwwwwwwwwwwwwwwpowwwwwwwwwwwwwwwwwwwwwwwwwwwwpowwwwwwwwwwwwwwwwwwwwwwwwwwwwpowwwwwwwwwwwwwwwwwwwwwwwwwwwwpowwwwwwwwwwwwwwwwwwwwwwwwwwwwpowwwwwwwwwwwwwwwwwwwwwwwwwwwwpowwwwwwwwwwwwwwwwwwwwwwwwwwwwpowwwwwwwwwwwwwwwwwwwwwwwwwwwwpowerBipowerBipowerBipowerBiwwwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        id: "1"
    }]
    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Senha',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'Power bi',
            dataIndex: 'powerBi',
            key: 'powerBi',
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
            render: (id: number) => (
                <>
                    <Button
                        onClick={() => DeleteSimulated(id)}
                        type="primary"
                        danger
                    >Deletar
                    </Button>
                </>
            )
        },

    ];

    async function DeleteSimulated(id: number) {
        setIsLoading(true)
        setTrigger(trigger + 1)
        await api.delete(`/api/cliente/${id}`)
            .then(function (response: any) {
                setIsLoading(false)

                toast.success('Cliente Deletado com sucesso')
            })
            .catch(function (error: any) {
                setIsLoading(false)

                toast.error(`Um erro inesperado aconteceu ${error.response?.status}`)
            });
    }

    useEffect(() => {
        async function getSimuleds() {
            await api.get(`/api/cliente`)
                .then(function (response: any) {
                    setIsLoading(false)
                    setData(response.data);
                })
                .catch(function (error: any) {
                    setIsLoading(false)
                    toast.error(`Um erro inesperado aconteceu ${error.response?.status}`)
                });
        }
        getSimuleds()
    }, [trigger])


    return (<>
        <S.Tools>
        </S.Tools>
        <div className="DivTable">
            <Table pagination={{ pageSize: 6 }} loading={isLoading} columns={columns} dataSource={fakeData} scroll={{ y: 430 }} />
        </div>
    </>
    )
}
