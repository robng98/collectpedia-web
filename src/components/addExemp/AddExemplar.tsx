import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { Colecao_Opt_Model, ResComicMangaModel } from "../../models/Models";
import api from "../../services/api";
import '../../App.css'

import styled from 'styled-components';

const Botao = styled.button.attrs(() => ({
    className: 'btn btn-danger btn-lg',
}))`
    background-color: var(--vermlar_escuro)
`;

const AddExemplar = () => {


    const location = useLocation()

    const addVet: string[] = location.state.addVet
    console.log(addVet)

    const [result, setResult] = useState<ResComicMangaModel[]>([]);
    const [colecoes, setColecoes] = useState<Colecao_Opt_Model[]>([])
    const [colEscolhida, setColEscolhida] = useState<string>('')
    const [dataEscolhida, setDataEscolhida] = useState<string>('')
    const [notaEscolhida, setNotaEscolhida] = useState<string>('')
    const email = window.localStorage.getItem('email') || undefined

    const navigate = useNavigate()

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

        
            api.get(`/admCol/countExempColecao/${email}`, config).then(response => {
                console.log(response.data)
                setColecoes(response.data)
            })

    }, [email, navigate]);

    const handleAdiciona = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let vetParam = addVet[0].replace(/%/g, " ").split(' ')
        
        const data = {
            email: email,
            nomeSerie: vetParam[0].replace(/_/g, ' '),
            nomeCol: colEscolhida,
            data_aqui: dataEscolhida,
            data_lanc: vetParam[3],
            vol: vetParam[1].substring(4),
            edNum: vetParam[2],
            est_conserv: notaEscolhida
        }
        


        try {
            api.post('/addExempColecao', data).then(response => {
                console.log(response.data)
            })
            
            
            
            vetParam = ['']
            navigate('/')
            
        } catch (error) {
            alert('Erro ao cadastrar o estado. Tente novamente');
            console.error(error)
        }

    }



    return (
        <div className="App">

            <p className="texto_subtit">
                ADICIONAR EXEMPLAR
            </p>
           
            <div className="fundo-div-principal" style={{ gridRow: ' 3' }}>

                {addVet.map((item: string) => (
                    <>
                        <p>
                            <h5>
                                <>
                                    {item.replace(/%/g, " ").replace(/_/g, ' ')}
                                </>
                            </h5>
                            <div className="d-flex">
                            <input type="date" id="data-aq" name="data-aq" onChange={e => setDataEscolhida(e.target.value)} required />
                            <select name="opc-nota" className="caixa-tp-busca" onChange={e => setNotaEscolhida(e.target.value)} style={{ fontSize: '16px' }} required>
                                <option value='' selected disabled>Grades</option>
                                <option value="GM (10.0)">GEM MINT (10.0)</option>
                                <option value="MT (9.9)">MT (9.9)</option>
                                <option value="NM/MT (9.8)">NM/MT (9.8)</option>
                                <option value="NM+ (9.6)">NM+ (9.6)</option>
                                <option value="NM(9.4)">NM(9.4)</option>
                                <option value="NM- (9.2)">NM- (9.2)</option>
                                <option value="VF/NM (9.0)">VF/NM (9.0)</option>
                                <option value="VF+ (8.5)">VF+ (8.5)</option>
                                <option value="VF (8.0)">VF (8.0)</option>
                                <option value="VF- (7.5)">VF- (7.5)</option>
                                <option value="FN/VF (7.0)">FN/VF (7.0)</option>
                                <option value="FN+ (6.5)">FN+ (6.5)</option>
                                <option value="FN (6.0)">FN (6.0)</option>
                                <option value="FN- (5.5)">FN- (5.5)</option>
                                <option value="VG/FN (5.0)">VG/FN (5.0)</option>
                                <option value="VG+ (4.5)">VG+ (4.5)</option>
                                <option value="VG (4.0)">VG (4.0)</option>
                                <option value="VG- (3.5)">VG- (3.5)</option>
                                <option value="GD/VG (3.0)">GD/VG (3.0)</option>
                                <option value="GD+ (2.5)">GD+ (2.5)</option>
                                <option value="GD (2.0)">GD (2.0)</option>
                                <option value="GD- (1.8)">GD- (1.8)</option>
                                <option value="FR/GD (1.5)">FR/GD (1.5)</option>
                                <option value="FR (1.0)">FR (1.0)</option>
                                <option value="PR (0.5)">PR (0.5)</option>
                                <option value="NR">NR</option>





                            </select>
                            <select name="opc-col" className="caixa-tp-busca" onChange={e => setColEscolhida(e.target.value)} style={{ fontSize: '16px' }} required>
                                <option value='' selected disabled>Coleções</option>
                                {colecoes.map(colecao => (
                                    <>
                                        <option value={colecao.nome_c}>{colecao.nome_c}</option>
                                    </>
                                ))}

                            </select>
                            </div>
                        </p>

                    </>

                ))}

            </div>

            <form onSubmit={handleAdiciona} style={{ gridRow: '4', gridColumn: '9/11' }}>

                <Botao type="submit">
                    Adicionar na Coleção
                </Botao>
            </form>



            
            <div style={{ gridRow: '4', gridColumn: '8/9' }}>
                <Botao onClick={() => navigate(-1)}>Voltar</Botao>
            </div>
            

        </div>


        
    )



}

export default AddExemplar;


