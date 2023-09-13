import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import { ColecaoVolEdicoes_Model, ExempSerie_Model } from "../../models/Models";
import api from "../../services/api";

const Botao = styled.button.attrs(() => ({
    className: 'btn btn-danger btn-lg',
}))`
    background-color: var(--vermlar_escuro)
`;

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

export const Radio = styled.input.attrs(() => ({
    className: 'form-check-input',
    type: 'radio'
}))`
:checked{
    background-color: var(--vermlar_escuro);
    border-color: var(--vermlar_claro)
}
`


const TelaColecao = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const nomeColecao = location.state.nomeColecao
    const email = location.state.email

    const [serieEdicoes, setSerieEdicoes] = useState<ColecaoVolEdicoes_Model[]>([])
    const [edFaltantes, setEdFaltantes] = useState<ColecaoVolEdicoes_Model[]>([])
    const [exempSerie, setExempSerie] = useState<ExempSerie_Model[]>([])
    const [serie, setSerie] = useState<string>('')
    const [vol, setVol] = useState<number>(0)
    const[exempExcluir, setExempExcluir] = useState<number>(0)



    let email_ = ''


    try {
        email_ = `${email}`
    } catch (error) {
        alert('Erro. Tente novamente');
        console.error(error);
    }

    const data1 = {
        email: email_,
        nomeCol: nomeColecao
    }

    const data2 = {
        email: email_,
        nomeCol: nomeColecao,
        nomeSerie: serie,
        vol: vol

    }


    useEffect(() => {

        

        api.post('/colecao/edicoesColecao', data1).then(response => {
            setSerieEdicoes(response.data)
        })

        api.post('/colecao/countEdFaltColecao', data1).then(response => {
            setEdFaltantes(response.data)
        })

        api.post('/colecao/exempSerie', data2).then(response => {
            setExempSerie(response.data)
        })

    }, [serie]);


    const handleEdFalt = (item: ColecaoVolEdicoes_Model) => {
        const falt = edFaltantes.find(elem => ((elem.nome === item.nome)))
        

        if (falt !== undefined) {

            return (
                <>
                    Edições faltantes <a style={{ color: 'var(--vermlar_claro)' }}>{falt.num}</a>
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }

    const handleSerieVol = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, nomeSerie: string, vol: number) => {
        e.preventDefault()
        setSerie(nomeSerie)
        setVol(vol)

    }

    const handleInfosExemp = () => {

        if (exempSerie.length !== 0) {
            return (
                <div className="fundo-div-principal" style={{ gridRow: '4', marginTop: ' 10px', gridColumn: '4/10' }}>

                    <div className="{{serie[0].replace(' ', '_')}}_{{serie[1]}}">

                        <table style={{ width: '100%', justifySelf: 'center' }}>

                            <tr className=" text-align: center;">
                                <th>Série</th>
                                <th>Nº</th>
                                <th>Comprado em</th>
                                <th>Conservação</th>
                                <th>Deletar</th>
                            </tr>
                            {exempSerie.map(exemplar => (
                                <>
                                    <tr>
                                        <td style={{color: 'var(--vermlar_claro)'}}>{exemplar.nome}</td>
                                        <td style={{color: 'var(--vermlar_escuro)'}}>#{exemplar.num}</td>
                                        <td style={{color: 'var(--vermlar_claro)'}}>{exemplar.dt.slice(0,10)}</td>
                                        <td style={{color: 'var(--vermlar_escuro)'}}>{exemplar.e_c}</td>
                                        <td style={{color: 'var(--vermlar_claro)'}}><Radio className="form-check-input" name="del-exemplar" value={exemplar.id} onChange={e => setExempExcluir(parseInt(e.target.value))} /></td>
                                    </tr>
                                </>
                            ))}

                        </table>

                    </div>
                </ div>
            )
        } else {
            return (
                <></>
            )
        }
    }

    const handleDeleteExemp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(exempExcluir)
        const dataDelete ={
            id: exempExcluir
        }
        api.post('/colecao/deleteExemplar', dataDelete).then(response => {
            console.log(response.data)
            window.location.reload()
        })
    }


    return (
        <div className="App">

            <p className="texto_subtit">
                COLEÇÃO {nomeColecao}

            </p>

            <div className="fundo-div-principal" id="oi1" style={{ gridRow: '3', marginTop: ' 10px', gridColumn: '4/10' }}>

                <p>
                    <div>
                        <table style={{ width: '100%', fontSize: '20px' }}>

                            <>
                                {serieEdicoes.map(item => (
                                    <>
                                        <tr>
                                            <td><a style={{ color: 'var(--vermlar_claro)' }}>{item.nome} </a></td>
                                            <td>VOL <a style={{ color: 'var(--vermlar_claro)' }}>{item.vol}</a></td>
                                            <td>Edições possuídas <a style={{ color: 'var(--vermlar_claro)' }}>{item.num}</a></td>
                                            <td>
                                                <>{handleEdFalt(item)}</>
                                            </td>
                                            <td><Botao_Peq onClick={e => handleSerieVol(e, item.nome, item.vol)}>Exibir info.</Botao_Peq></td>
                                        </tr>
                                    </>
                                ))}
                            </>
                        </table>

                    </div>
                </p>

            </div>

            <>
                {handleInfosExemp()}
            </>


            <form onSubmit={e => handleDeleteExemp(e)} style={{ gridColumn: '9', gridRow: '2' }}>
               <Botao  type='submit'>
                    REMOVER
                </Botao>
            </form>

            
            <div style={{ gridRowStart: '2', gridColumn: '10' }}>
                <Botao onClick={() => navigate(-1)}>Voltar</Botao>
            </div>
        </ div>
    )
}
export default TelaColecao;
