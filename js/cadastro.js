const btnCadastro = document.querySelector('.btn_cadastro');
btnCadastro.addEventListener('click', async(e)=>{
    e.preventDefault()
    const senha = document.querySelector('.input_password').value;
    const email = document.querySelector('.input_email').value;
    const nome = document.querySelector('.input_nome').value;
    const modal = document.querySelector('.modal_preencha');
    const filter = document.querySelector('.filter');
    if(senha==="" || email==="" || nome===""){
        modal.style.visibility = "visible";
        filter.style.visibility = "visible";
    } else {
        const data = {
            "name": `${nome}`,
            "email": `${email}`
        }
        const result = await api.post('users/create', data, {
            headers: {
                "Content-Type": "application/json",
                "senha": `${senha}`
              }
        })
        .then((result)=>{
                return result;
        })
        .catch((erro)=>{console.log(erro)})
        
        if(result.status!==201){
            modal.style.visibility = "visible";
            filter.style.visibility = "visible";
        } else {
            localStorage.setItem("id_user", JSON.stringify(result.data.id_user))
            window.location.assign('../pages/home.html');
        }
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

const irLogin = document.querySelector('.ir_login_p');
irLogin.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.assign('../pages/login.html')
})

const btnCancelar = document.querySelector('.btn_cancelar');
btnCancelar.addEventListener('click', (e)=>{
    e.preventDefault();
    const form = document.querySelector(".Ca-form_inputs")
    form.reset();
})
