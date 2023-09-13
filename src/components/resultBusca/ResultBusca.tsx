import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ResComicMangaModel } from "../../models/Models";
import api from "../../services/api";
import "./resultBusca.css";
import '../../App.css'

import styled from 'styled-components';

const Botao = styled.button.attrs(() => ({
    className: 'btn btn-danger btn-lg',
}))`
    background-color: var(--vermlar_escuro)
`;

const ResultBusca = () => {
    const { tipo, busca } = useParams();

    const [result, setResult] = useState<ResComicMangaModel[]>([]);

    useEffect(() => {
        try {

            api.get(`/b_${tipo}/${busca}`).then(response => {
                setResult(response.data);

            });
        } catch (error) {
            alert('Erro ao cadastrar o estado. Tente novamente');
            console.error(error);
        }
    }, [tipo, busca]);


    if (tipo === "comic") {

        return (
            <div className="App">

                <p className="texto_subtit">
                    RESULTADOS PARA BUSCA "{busca}"
                </p>

                <div className="fundo-div-principal" style={{ gridRow: '3' }}>

                    <table style={{ width: '100%', fontSize: '18px' }}>
                        <tbody>
                            {result.map((item, index) => (
                                <>
                                    <tr key={index} style={{ borderColor: 'var(--vermlar_escuro)', borderWidth: '0 0 1px 5px' }}>

                                        <Link to={`/${tipo}/${item.nome.replace(/ /g, '_')}/${item.vol}`}
                                            state={{ nome: item.nome, editora: item.editora }}
                                            style={{ textDecoration: 'none', color: 'var(--vermlar_claro)' }} >
                                            <td style={{ fontSize: '20px' }}>
                                                {item.nome}
                                            </td>
                                        </Link>
                                    </tr>
                                    <tr style={{ borderColor: 'var(--vermlar_claro)', borderRightWidth: '10px', backgroundColor: 'var(--cinza_claro)' }}>
                                        <td>VOL: {item.vol}</td>
                                        <td>Quant. Eds: {item.num_edicoes}</td>
                                        <td>Ano Pub: {item.ano_pub}</td>
                                        <td>Editora: {item.editora}</td>
                                    </tr>
                                </>
                            ))}

                        </tbody>
                    </table>

                </div>

                <Link to={'/'} style={{ gridRow: '4', gridColumn: '9/11' }}>
                    <Botao>Voltar</Botao>
                </Link>


            </div >
        )
    } else {
        if (tipo === "manga") {
            return (
                <div className="App">
                    <p className="texto-subtit">
                        RESULTADOS PARA BUSCA {busca}
                    </p>


                    <div className="fundo-div-principal" style={{ gridRow: '3' }}>

                        <table style={{ width: '100%', fontSize: '18px' }}>
                            <tbody>
                                {result.map((item, index) => (
                                    <>
                                        <tr key={index} style={{ borderColor: 'var(--vermlar_escuro)', borderWidth: '0 0 1px 5px' }}>


                                            <td style={{ fontSize: '20px' }}>

                                                <Link to={`/${tipo}/${item.nome.replace(/ /g, '_')}/${item.vol}`}
                                                    state={{
                                                        nome: item.nome, 
                                                        editora: item.editora,
                                                        demografia: item.demografia,
                                                        nome_jap: item.nome_jap
                                                    }}
                                                    style={{ textDecoration: 'none', color: 'var(--vermlar_claro)' }} > {item.nome}
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr style={{ borderColor: 'var(--cinza_claro)', borderBottomWidth: '1px' }}>

                                            <td>Nome Japonês: {item.nome_jap}</td>
                                            <td>Quant. Tankos: {item.num_tankos}</td>
                                            <td>Ano Pub: {item.ano_pub}</td>
                                        </tr>
                                        <tr style={{ borderColor: 'var(--cinza_claro)', borderBottomWidth: '1px' }}>

                                            <td>Editora: {item.editora}</td>
                                            <td>Demografia: {item.demografia}</td>
                                            <td>VOL: {item.vol}</td>

                                        </tr>
                                    </>
                                ))}

                            </tbody>
                        </table>

                    </div>

                    <Link to={'/'} style={{ gridRow: '4', gridColumn: '9/11' }}>
                        <Botao>Voltar</Botao>
                    </Link>
                </div>
            )
        }
    }

    return (
        <>
            <div className="fundo-div-principal" style={{ gridRow: '3' }}>
                Erro ao carregar
            </div>
        </>
    )

}

export default ResultBusca;


