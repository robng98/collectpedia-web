import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";



const SignUp = () => {

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confsenha, setConfSenha] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        
        
        
        
        
        

        if (senha === confsenha) {

            const data = {
                username: user,
                email: email,
                senha: senha
            }
            console.log({ data })

            

            

            

            
            
            

            try {
                await api.post('/users', data)

                navigate('/');
                window.location.reload()
            }catch(error){
                window.alert(`Cadastro deu errado. Tente novamente_${error}`)
                window.location.reload()
            }



        } else {
            window.alert('Senhas não conferem. Tente novamente')
            window.location.reload()
        }
    }


    return (
        <div className="App">

            <p className="texto_subtit">
                CRIAR USUÁRIO
            </p>
            

            <div className="fundo-div-principal" style={{ gridRow: '3', padding: '25px 20px 30px 30px' }}>



                <p> <input type="text" placeholder="Nome" name="userName" className="texto_busca"
                    required style={{ width: '40%' }} onChange={e => setUser(e.target.value)} /></p>
                

                <p> <input type="email" placeholder="Email" name="email" className="texto_busca"
                    required style={{ width: '40%' }} onChange={e => setEmail(e.target.value)} /></p>
                

                <p><input type="password" placeholder="Senha" name="senha" className="texto_busca"
                    required style={{ width: '40%' }} onChange={e => setSenha(e.target.value)} /></p>
                


                <p><input type="password" placeholder="Confirmar Senha" name="Confsenha" className="texto_busca"
                    required style={{ width: '40%' }} onChange={e => setConfSenha(e.target.value)} /></p>
                

                <div style={{ marginTop: '10%', gridColumn: '4', textAlign: 'start' }}>
                    Já possui uma conta? Então, clique <a href="/login" style={{ color: 'var(--vermlar_escuro)' }}>aqui</a> para fazer seu login.
                </div>

            </div>
            
            <form onSubmit={handleSignUp} style={{ gridColumn: '8/10', gridRow: '4' }}>
                <input type="submit" name="acao" value="cadastrar" className="bot-buscar-home" />
            </form>
        </div>
        
    )
}

export default SignUp