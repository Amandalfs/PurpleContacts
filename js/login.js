const btnLogin = document.querySelector('.btn_login');
btnLogin.addEventListener('click',(e)=>{
    e.preventDefault()
    const senha = document.querySelector('.input_email').value;
    const email = document.querySelector('.input_password').value;
    const modal = document.querySelector('.modal_preencha');
    const filter = document.querySelector('.filter');
    if(senha==="" || email===""){
        modal.style.visibility = "visible";
        filter.style.visibility = "visible";
    } else {
        window.location.assign('../pages/home.html')
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