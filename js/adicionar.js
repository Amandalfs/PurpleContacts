const abrirModal = document.querySelector('.btn_add');
const modalAdicionar = document.querySelector('.modal_add');

const btnAdd = document.querySelector('.modal_btn_add');
const btnFechar = document.querySelector('.modal_add_x');
const btnLimpar = document.querySelector('.modal_btn_limpar')

const filter = document.querySelector('.filter');
const erroSpan = document.querySelector('.error_add_modal');

const form = document.querySelector('.modal_add_inputs'); 

let nome = document.querySelector('.adicionar_input_nome').value
let email = document.querySelector('.adicionar_input_email').value
let telefone = document.querySelector('.adicionar_input_telefone').value

abrirModal.addEventListener('click',(e)=>{
    e.preventDefault()
    e.stopPropagation()
    modalAdicionar.style.visibility = "visible";
    filter.style.visibility = "visible";
    
})

btnAdd.addEventListener('click',async(e)=>{
    e.preventDefault();
    e.stopPropagation();
    nome = document.querySelector('.adicionar_input_nome').value
    email = document.querySelector('.adicionar_input_email').value
    telefone = document.querySelector('.adicionar_input_telefone').value
    const id_user = JSON.parse(localStorage.getItem('id_user')).id_user
    console.log(id_user)
    if(nome==="" || email==="" || telefone ===""){
        erroSpan.innerHTML = "Preencha os campos para adicionar um novo contato"
    } else {
        const body = {
            "name": nome,
            "email": email,
            "telefone": telefone,
            "id_user": id_user
        }
        const myInit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            body: JSON.stringify(body)
        }
        await apiRenderAdicionar(myInit);
        modalAdicionar.style.visibility = "hidden";
        filter.style.visibility = "hidden";
        location.reload()
    }
})

btnLimpar.addEventListener('click',(e)=>{
    console.log('ok')
    e.preventDefault();
    e.stopPropagation();
    erroSpan.innerHTML = "";
    form.reset()
})

btnFechar.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopPropagation();
    modalAdicionar.style.visibility = "hidden";
    filter.style.visibility = "hidden";
    erroSpan.innerHTML = "";
})


async function apiRenderAdicionar(myInit){
    await fetch(`https://api-agenda.cyclic.app/contatos/adicionar`, myInit)
}