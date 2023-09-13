import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { Colecoes_Model } from "../../models/Models";
import api from "../../services/api";
import { Radio } from "../telaColecao/TelaColecao"


const Botao_Peq = styled.button.attrs(() => ({
    className: 'btn btn-danger',
}))`
    background-color: var(--vermlar_escuro)
`;

const Check = styled.input.attrs(() => ({
    className: 'form-check-input',
    type: 'checkbox',
}))`
:checked{
    background-color: var(--vermlar_escuro);
    border-color: var(--vermlar_claro)
}
`;

const Botao = styled.button.attrs(() => ({
    className: 'btn btn-danger btn-lg',
}))`
    background-color: var(--vermlar_escuro)
`;


const TelaAdmColecoes = () => {



    const [colecoes, setColecoes] = useState<Colecoes_Model[]>([])

    const [nomeOld, setNomeOld] = useState<string>('')
    const [nomeNew, setNomeNew] = useState<string>('')
    const [flagCriar, setFlagCriar] = useState<number>(0)


    const location = useLocation()
    const navigate = useNavigate()

    let email_ = ''


    try {
        email_ = location.state.email
        console.log(email_)
    } catch (error) {
        alert('Erro. Tente novamente');
        console.error(error);
    }


    useEffect(() => {

        const token = window.localStorage.getItem('token') || undefined

        if (token === undefined) {
            navigate('/login');
        }

        const header = window.localStorage.getItem('header');

        const config = {
            headers: {
                "Authorization": `Bearer ${header} ${token}`
            }
        }

        api.get(`/admCol/countExempColecao/${email_}`, config).then(response => {
            setColecoes(response.data)
        })

    }, [email_]);


    const handleAtualizaNome = async (e: React.FormEvent<HTMLElement>) => {

        e.preventDefault()

        const data = {
            email: email_,
            nomeCol: nomeOld,
            novoNomeCol: nomeNew
        }

        console.log(data)

        api.post('/admCol/updNomeColecao', data).then(response => {
            console.log(response.data)
        })

        window.location.reload()
    }

    const handleDeletaCol = async (e: React.FormEvent<HTMLElement>) => {

        e.preventDefault()

        const data = {
            email: email_,
            nomeCol: nomeOld
        }

        console.log(data)

        api.post('/admCol/deleteColecao', data).then(response => {
            console.log(response.data)
        })

        window.location.reload()
    }

    const handleCreateCol = async (e: React.FormEvent<HTMLElement>) => {

        e.preventDefault()

        const data = {
            email: email_,
            nomeCol: nomeNew
        }

        console.log(data)

        api.post('/admCol/createColecao', data).then(response => {
            console.log(response.data)
        })

        window.location.reload()
    }

    const handleEditaDeleta = (nomeOld: string) => {
        console.log(nomeOld)
        if (nomeOld != '') {

            return (

                <>
                    <div className="editar_colecao" id="editar_colecao" style={{ display: 'grid', gridRow: '6', gridTemplateColumns: 'repeat(12,1fr)', gridTemplateRows: 'repeat(3,1fr)', paddingLeft: ' 20px', marginTop: '5%' }}>

                        <section style={{ gridRow: '1', gridColumn: '1/5', textAlign: 'left', fontSize: '30px' }}>
                            Editar/Remover
                        </section>


                        <section style={{ gridRow: '2', gridColumn: ' 1/7' }}>
                            <input type="text" name="editar_nome_colecao" onChange={e => setNomeNew(e.target.value)}
                                placeholder="Nome da coleção" value={nomeNew} className="texto_busca" required />

                        </section>

                        <form onSubmit={handleAtualizaNome} style={{ gridRow: '3', gridColumn: '9/13' }}>
                            <section >
                                <input type="submit" name="add_colecao_nova" value="Renomear"
                                    className="bot-buscar-home" />
                            </section >
                        </form>

                        <form onSubmit={handleDeletaCol} style={{ gridRow: '3', gridColumn: '5/8' }}>
                            <section >
                                <input type="submit" name="add_colecao_nova" value="Remover"
                                    className="bot-buscar-home" />
                            </section>
                        </form>
                    </div>

                </>
            )

        } else {

            return (

                <>
                </>
            )
        }

    }

    const divCriarColecao = (flag: number) => {
        console.log(`FLAG ${flag}`)
        if (flag == 1) {
            return (
                <>
                    <div className="editar_colecao" id="editar_colecao" style={{ display: 'grid', gridRow: '6', gridTemplateColumns: 'repeat(12,1fr)', gridTemplateRows: 'repeat(3,1fr)', paddingLeft: ' 20px', marginTop: '5%' }}>


                        <section style={{ gridRow: '1', gridColumn: '1/5', textAlign: 'left', fontSize: ' 30px' }}>
                            Criar nova coleção
                        </section>



                        <section style={{ gridRow: '2', gridColumn: '1/8' }}>
                            <input type="text" name="editar_nome_colecao" onChange={e => setNomeNew(e.target.value)}
                                placeholder="Nome da coleção" value={nomeNew} className="texto_busca" />

                        </section>
                        <form onSubmit={handleCreateCol} style={{ gridRow: '3', gridColumn: '9/13' }}>

                            <section>
                                <input type="submit" name="add_colecao_nova" value="Adicionar"
                                    className="bot-buscar-home" />
                            </section>
                        </form>


                    </div>
                </>
            )
        } else {
            return (
                <>
                </>
            )
        }
    }



    return (
        <div className="App">

            <div className="texto_subtit" style={{ gridColumn: '3/5', gridRow: '1' }}>
                <section >Adm. Coleções </section>
            </div>

            <div style={{ gridRow: '5', gridColumn: '3/6' }}>
                <Botao value={1} onClick={e => setFlagCriar(parseInt(e.currentTarget.value))} style={{ fontSize: ' 22px' }}>Criar Coleção</Botao>
            </div>
            <div className="fundo-div-principal">
                <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '15px 0 25px 0' }}>

                    <table style={{ width: '100%', fontSize: '20px' }}>

                        {colecoes.map(colecao => (
                            <>
                                <tr className="border-bottom border-danger">
                                    <td>{colecao.nome_c}</td>
                                    <td>
                                        Quantidade de exemplares <a style={{ color: 'var(--vermlar_claro)' }}>{parseInt(colecao.count) | 0}</a>
                                    </td>
                                    <td></td>
                                    <div className="d-flex justify-content-between">

                                        <div>
                                            <label className="form-check-label" htmlFor="radioId">
                                                Renomear/Excluir
                                            </label>
                                        </div>
                                        <div>

                                            <td onChange={e => setNomeOld(colecao.nome_c)}>
                                                <Radio name="escolha" value={colecao.nome_c} id="radioId" />
                                            </td>
                                        </div>
                                    </div>
                                </tr>
                            </>
                        ))}

                    </table >
                </div >

            </div >

            <>
                {handleEditaDeleta(nomeOld)}
                {console.log(flagCriar)}
                {divCriarColecao(flagCriar)}
            </>

            <div style={{ gridRowStart: '5', gridColumn: '9' }}>
                <Botao onClick={() => navigate(-1)}>Voltar</Botao>
            </div>

        </ div>


    )
}
export default TelaAdmColecoes;
