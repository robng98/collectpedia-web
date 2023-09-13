import React from 'react';
import './App.css';
import './index.css';
import api from './services/api';
import { SelecaoRecentesModel } from './models/Models';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';


const Botao = styled.button.attrs(() => ({
    className: 'btn btn-danger btn-lg',
}))`
    background-color: var(--vermlar_escuro)
`;

const App = () => {

	const navigate = useNavigate();

	const [busca, setBusca] = useState('');
	const [tipo, setTipo] = useState('comic');


	const [recentes, setRecentes] = useState<SelecaoRecentesModel[]>([]);


	const handleBuscaSerie = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		navigate(`/b_${tipo}/${busca}`);
	}

	useEffect(() => {
		api.get('/recentes').then(response => {
			setRecentes(response.data.slice(0, 5));
		});

	}, []);

	
	const un_mons = recentes.map(item => (
		item.mon
	))

	const tipo_rec = un_mons.map((index) => {
		if (un_mons[parseInt(index)] = 'USD')
			return ('comic')
		else {
			if (un_mons[parseInt(index)] = 'YEN')
				return ('manga')
		}
	})



	return (
		<div className="App" >


			<div className="fundo-div-principal" style={{ gridRow: '3', gridColumn: '3/11', marginBottom: '3%' }}>

				<form onSubmit={handleBuscaSerie}>
					<div className="logotipo-home">

						<img width="150" height="150" src="/logo2.svg" alt="" />
						<h1 style={{ fontSize: 'var(--font-sz-maxx)', fontFamily: 'var(--font_logo)' }}>Collectpedia</h1>
					</div>
					<p>
						<select name="opc_busca" className="caixa-tp-busca" value={tipo} onChange={e => setTipo(e.target.value)}>
							<option value="comic">Comics</option>
							<option value="manga">Manga</option>
						</select>
					</p>
					<p><input type="text" placeholder="Digite aqui" title="Buscar série" className="texto_busca" name="home-busca" required value={busca} onChange={e => setBusca(e.target.value)} /></p>

					<br /><br />
					<Botao type="submit">Buscar</Botao>

				</form>
			</div>

			<div className="fundo-div-principal" style={{ paddingBottom: '4%', marginBottom: '5%', gridRow: '5', paddingTop: '0', display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gridTemplateRows: '1fr' }}>

				<div style={{ textAlign: 'start', gridRow: '1', gridColumn: '1/6', fontSize: '30px', fontWeight: '700', margin: '5% 0 2% 2%' }}>
					<p>Lançamentos recentes</p>
				</div>

				<ul style={{ gridRow: '2', gridColumn: '1/13', display: 'flex', justifyContent: 'space-evenly', listStyleType: 'none', padding: '0' }}>
					{recentes.map((item, index) => (
						<li key={index}>
							<Link to={`/${tipo_rec[index]}/${item.nome.replace(/ /g, '_')}/${item.vol}`}
								state={{ nome: item.nome, editora: item.ed_nome }}>
								<img width="150" height="230" src={item.capa} key={index}
									alt={`${item.nome} vol ${item.vol} #${item.num}`} style={{ borderRadius: '8%' }} />
							</Link>
						</li>
					))}

				</ul>

			</div>


		</div >
	);
}


export default App;
