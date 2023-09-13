import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import { SerieEsqModel, SerieDirModel } from "../../models/Models";
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



const TelaSerie = () => {

    const { tipo, vol, serie } = useParams();

    const serie_sep = serie?.replace(/_/g, ' ');

    const [esquerda, setEsquerda] = useState<SerieEsqModel[]>([]);
    const [direita, setDireita] = useState<SerieDirModel[]>([]);

    const location = useLocation();

    const editora = location.state.editora
    const nome_serie = location.state.nome
    const demografia = location.state.demografia
    const nome_jap = location.state.nome_jap

    let [numero, setNumero] = useState('1A')
    let [numero_m, setNumeroM] = useState('1')
    let data_la = []

    const navigate = useNavigate()

    const [addVet, setAddVet] = useState<string[]>([]);



    useEffect(() => {

        try {

            if (tipo === 'comic') {
                api.get(`/c/${serie_sep}/${vol}`).then(response => {
                    setEsquerda(response.data);
                    

                });
                api.get(`/single/${serie_sep}/${vol}/${numero}`).then(response => {
                    setDireita(response.data);
                    

                });
            } else {
                if (tipo === 'manga') {
                    api.get(`/m/${serie_sep}/${vol}`).then(response => {
                        setEsquerda(response.data);
                        

                    });
                    api.get(`/tanko/${serie_sep}/${vol}/${numero_m}`).then(response => {
                        setDireita(response.data);
                        

                    });
                }
            }
        } catch (error) {
            alert('Erro. Tente novamente');
            console.error(error);
        }
    }, [vol, serie_sep, numero, numero_m, navigate]);

    const info_edicao = direita.slice(0, 1)
    data_la = info_edicao.map(item => (
        item.data_lanc
    )
    )
    const rel_date = data_la.toString().substring(0, 10)

    

    
    

    
    
    

    
    

    

    const altVet = async (check: boolean, elem: string) => {

        if (check && addVet.indexOf(elem) === -1) {
            console.log(elem)
            setAddVet([elem])
        }

    }

    const altData = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setNumero(e.currentTarget.id)
    }

    
    const altData_M = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setNumeroM(e.currentTarget.id)
    }


    if (tipo === 'comic') {
        return (
            <>
                <div style={{ gridRow: '4', gridColumn: '1/13', display: 'grid', gridTemplateColumns: 'repeat(12,1fr)' }}>

                    <div className="texto_subtit" style={{ gridColumn: '3/13', gridRow: '2/3', display: 'grid', gridTemplateColumns: 'repeat(10,1fr)', gridTemplateRows: 'auto', marginBottom: '5%' }}>
                        <div style={{ gridRow: '1', fontSize: '32px', gridColumn: '1/5' }}>{nome_serie}</div>
                        <div style={{ gridRow: '2', gridColumn: '1/4', marginLeft: '5%' }}>Editora: {editora}</div>

                        <div style={{ gridRow: '1', gridColumn: '7' }}>
                            {/* <input type="submit"
                                name="add" id="add" value="Adicionar" className="bot-dir-inf" /> */}
                            {/* <Link to={'/addExemplar'} state={{ addVet: addVet }}>
                                <Botao type="submit">Adicionar</Botao>
                            </Link> */}
                        </div>
                    </div>

                    <div className="fundo-div-principal" style={{ overflow: 'auto', gridRow: '3/5', gridColumn: '3/8', marginRight: '20px' }}>


                        <table style={{ width: '100%', fontSize: '22px', justifySelf: 'center' }}>
                            <tbody>
                                <tr>
                                    <th>Nome</th>
                                    <th>Nº</th>
                                    <th>Preço</th>
                                    {/* <th>Adicionar</th> */}
                                </tr>
                            </tbody>
                        </table>

                        <table style={{ width: '100%', fontSize: '20px', justifySelf: 'center' }}>
                            {/* <tbody> */}
                            {esquerda.map((item, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{item.nome}</td>
                                        <td>
                                            {/* <a style={{color: var(--vermlar_claro)'," href="/serie/{{editora}}/{{linha[0].replace(' ', '_')}}/{{vol}}/{{linha[1]}}"
                                        style={{text-decoration: none'," > #{{ linha[1]}} </a> */}
                                            <Botao_Peq id={item.num} onClick={e => (altData(e))}
                                                value={`${serie}%Vol_${vol}%${item.num}%${rel_date}`} >{item.num}</Botao_Peq>


                                        </td>
                                        <td>
                                            {item.un_mon} {item.preco}
                                        </td>
                                        {/* <td>
                                            <td style={{ gridColumn: '12' }} className="form-check">

                                                <Check value={`${serie}%Vol_${vol}%${item.num}%${rel_date}`} onChange={e => altVet(e.target.checked, e.target.value)}
                                                    id="flexCheckDefault" />


                                            </td>
                                        </td> */}
                                    </tr>
                                </tbody>
                            ))}
                            {/* </tbody> */}
                        </table>

                    </div>
                    {info_edicao.map((item, index) => (
                        <>
                            {console.log(item)}
                            <div style={{ gridColumn: '9' }}>
                                <Link to={'/addExemplar'} state={{ addVet: addVet }}>
                                    <Botao type="submit" >Adicionar</Botao>
                                </Link>
                            </div>
                            <div className="fundo-div-principal" style={{ gridRow: '3', gridColumn: '8/11', margin: '0 20% 10% 20%' }}>

                                <img src={item.capa} height="350px" width="240px" alt="/static/imgs_png/mk5.png" />
                            </div>


                            <div className="fundo-div-principal" style={{ gridRow: '4', gridColumn: '8/11' }}>



                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td>Série: {item.nome}</td>
                                            <td>VOL: {item.vol}</td>
                                            <td>#{item.num}</td>
                                        </tr>

                                        <tr>
                                            <td>{item.mon} {item.preco}</td>
                                            <td>Data de Publicação: {item.data_lanc.substring(0, 10)} </td>
                                        </tr>

                                        {direita.map(item2 => (
                                            <tr>
                                                <td>{item2.func}: {item2.c_nome}</td>
                                            </tr>
                                        ))}

                                        <tr>
                                            <td>Estado de Publicação: {item.estado_pub_atual}</td>
                                        </tr>
                                        <tr>
                                            Adicionar na coleção <Check value={`${item.nome.replace(/ /g, '_')}%Vol_${item.vol}%${item.num}%${item.data_lanc.substring(0, 10)}`}
                                                onChange={e => altVet(e.target.checked, e.target.value)}
                                                id="flexCheckDefault" />
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Adicionar na coleção
                                <input type="checkbox" name="ed_add"
                                    id="{{prem_dir[0][0].replace(' ', '+')}}_{{vol}}_{{prem_dir[0][1]}}" value="{{prem_dir[0][0].replace(' ', '+')}}_{{vol}}_{{prem_dir[0][1]}}_{{prem_dir[0][5]}}" /> */}


                            </div>
                        </>
                    ))}
                </div>



            </>
        )
    } else {
        if (tipo === 'manga') {
            return (
                <>

                    <div style={{ gridRow: '4', gridColumn: '1/13', display: 'grid', gridTemplateColumns: 'repeat(12,1fr)' }}>
                        <div className="texto_subtit" style={{ gridColumn: '3/13', gridRow: '2/3', display: 'grid', gridTemplateColumns: 'repeat(10,1fr)', gridTemplateRows: 'auto', marginBottom: '6%' }}>
                            <div style={{ gridRow: '1', fontSize: '32px', gridColumn: '1/5' }}>{nome_serie}</div>
                            <div style={{ gridRow: '2', gridColumn: '1/4', marginLeft: '5%' }}>Nome Original: {nome_jap} Demografia: {demografia}</div>
                            <div style={{ gridRow: '2', gridColumn: '4/7' }}> Editora: {editora}</div>

                            <div style={{ gridRow: '1', gridColumn: '7' }}>\
                            </div>
                        </div>

                        <div className="fundo-div-principal" style={{ overflow: 'auto', gridRow: '3/5', gridColumn: '3/8', marginRight: '20px' }}>

                            <table style={{ width: '100%', fontSize: '22px', justifySelf: 'center' }}>
                                <tbody>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Nº</th>
                                        <th>Preço</th>
                                    </tr>
                                </tbody>
                            </table>

                            <table style={{ width: '100%', fontSize: '20px', justifySelf: 'center' }}>
                                {esquerda.map((item, index) => (
                                    <tbody key={index}>
                                        <tr>
                                            <td>{item.nome}</td>
                                            <td>
                                             
                                                <Botao_Peq id={item.num} onClick={e => (altData_M(e))}
                                                    value={`${serie}%Vol_${vol}%${item.num}%${rel_date}`} >{item.num}</Botao_Peq>


                                            </td>
                                            <td>
                                                {item.un_mon} {item.preco}
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                                {/* </tbody> */}
                            </table>

                        </div>
                        {info_edicao.map((item, index) => (
                            <>
                                <div style={{ gridColumn: '9', gridRow: '2' }}>
                                    <Link to={'/addExemplar'} state={{ addVet: addVet }}>
                                        <Botao type="submit" >Adicionar</Botao>
                                    </Link>
                                </div>
                                <div className="fundo-div-principal" style={{ gridRow: '3', gridColumn: '8/11', margin: '0 20% 10% 20%' }}>

                                    <img src={item.capa} height="350px" width="240px" alt="/static/imgs_png/mk5.png" />
                                </div>


                                <div className="fundo-div-principal" style={{ gridRow: '4', gridColumn: '8/11' }}>



                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td>Série: {item.nome}</td>
                                                <td># {item.num}</td>
                                                <td>Quant. de Capítulos: {item.caps}</td>
                                            </tr>

                                            <tr>
                                                <td>{item.mon} {item.preco}</td>
                                                <td>Data de Publicação: {rel_date}</td>
                                            </tr>

                                            {direita.map(item2 => (
                                                <tr>
                                                    <td>{item2.func}: {item2.mangaka}</td>
                                                </tr>
                                            ))}

                                            <tr>
                                                <td>Estado de Publicação: {item.estado_pub_atual}</td>
                                            </tr>
                                            <tr>
                                                Adicionar na coleção <Check value={`${item.nome.replace(/ /g, '_')}%Vol_${vol}%${item.num}%${item.data_lanc.substring(0, 10)}`}
                                                    onChange={e => altVet(e.target.checked, e.target.value)}
                                                    id="flexCheckDefault" />

                                                    <>
                                                    {console.log(addVet)}
                                                    </>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/* Adicionar na coleção
                                    <input type="checkbox" name="ed_add"
                                        id="{{prem_dir[0][0].replace(' ', '+')}}_{{vol}}_{{prem_dir[0][1]}}" value="{{prem_dir[0][0].replace(' ', '+')}}_{{vol}}_{{prem_dir[0][1]}}_{{prem_dir[0][5]}}" /> */}


                                </div>
                            </>
                        ))}
                    </div>



                </>
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

export default TelaSerie;