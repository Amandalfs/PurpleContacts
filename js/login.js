const btnLogin = document.querySelector('.btn_login');
btnLogin.addEventListener('click', async(e)=>{
    e.preventDefault()
    const senha = document.querySelector('.input_password').value;
    const email = document.querySelector('.input_email').value;
    const modal = document.querySelector('.modal_preencha');
    const p = document.querySelector('.modal_preencha_p');
    const filter = document.querySelector('.filter');
    if(senha==="" || email===""){
        modal.style.visibility = "visible";
        filter.style.visibility = "visible";
    }
    const dados = await api.get(`users/login?email=${email}&senha=${senha}`)
        .then((result)=>{ return result})
        .catch((e)=>{})

    console.log(dados)
    
    if(dados.data.msg){
        modal.style.visibility = "visible";
        filter.style.visibility = "visible";
    } else {
        localStorage.setItem("id_user", JSON.stringify(dados.data.id_user))
        window.location.assign('../pages/home.html');
    }
})

const btnFecharModal = document.querySelector('.btn_preencha_x');
btnFecharModal.addEventListener('click', (e)=>{
    e.preventDefault();
    const modal = document.querySelector('.modal_preencha');
    const filter = document.querySelector('.filter');
    modal.style.visibility = "hidden";
    filter.style.visibility = "hidden";
})

const irCadastro = document.querySelector('.ir_cadastro_p');
irCadastro.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.assign('../pages/cadastro.html')
})
