window.addEventListener('load', ()=>{
    monstrarDados()
})


async function monstrarDados(){
    const contatos = document.querySelector('.template_principal');

    const id_user = JSON.parse(localStorage.getItem('id_user', JSON.stringify)).id_user; 
    const dados = await apiRender(id_user);

    console.log(dados)
    dados.contatos.forEach((dado)=> {
        const divPrincipal = document.createElement('div')
        divPrincipal.setAttribute('class', 'cont_template');


        const divNome = document.createElement('p')
        const divEmail = document.createElement('p')
        const telefone = document.createElement('p')

        divNome.setAttribute('class','template_nome') 
        divEmail.setAttribute('class','template_email')
        telefone.setAttribute('class','template_telefone')

        divNome.innerHTML = dado.name
        divEmail.innerHTML = dado.email
        telefone.innerHTML = dado.telefone

        const btnDelete = document.createElement('button')
        const btnEdit = document.createElement('button')

        btnDelete.setAttribute('class', 'btn_delete')
        btnEdit.setAttribute('class', 'btn_edit')

        btnDelete.value = dado.id_agenda
        btnEdit.value = dado.id_agenda
        
        divPrincipal.appendChild(divNome);
        divPrincipal.appendChild(divEmail);
        divPrincipal.appendChild(telefone);
        divPrincipal.appendChild(btnDelete);
        divPrincipal.appendChild(btnEdit);
        contatos.appendChild(divPrincipal);

/*         divPrincipal.appendChild(divData);
        divPrincipal.appendChild(divDesc);
        transacoes.appendChild(divPrincipal); */
    });
    
}   

const btnSair = document.querySelector('.menu_sair')
btnSair.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.assign('../pages/login.html')
})

const abrirAdd = document.querySelector('.btn_add');
const modalAdd = document.querySelector('.modal_add');
const modalDel = document.querySelector('.modal_remove');
const filter = document.querySelector('.filter');

const btnX = document.querySelector('.modal_add_x');
const btnModelAdd = document.querySelector('.modal_btn_add');
const modalLimpar = document.querySelector('.modal_btn_limpar');
const btnsAdd = [btnX, btnModelAdd, modalLimpar];

for (const btn of btnsAdd) {
    btn.addEventListener('click', (e)=>{
        e.preventDefault()
        modalAdd.style.visibility = "hidden";
        filter.style.visibility = "hidden";
    })
}

abrirAdd.addEventListener('click',(e)=>{
    e.preventDefault()
    modalAdd.style.visibility = "visible";
    filter.style.visibility = "visible";
})

const btnsDelete = document.querySelectorAll('.btn_delete');
for (const btnDel of btnsDelete) {
    btnDel.addEventListener('click', (e)=>{
        e.preventDefault();
        modalDel.style.visibility = "visible";
        filter.style.visibility = "visible";
    })
}

const btn_exc = document.querySelector('.modal_remove_btn_excluir');
const btn_cance = document.querySelector('.modal_remove_btn_cancelar');
const btnDelX = document.querySelector('.modal_remove_btn_x');
const btnsFechaDelete = [btn_exc, btn_cance, btnDelX];
for (const btn2 of btnsFechaDelete) {
    btn2.addEventListener('click', (e)=>{
        e.preventDefault();
        modalDel.style.visibility = "hidden";
        filter.style.visibility = "hidden";
    })
}



async function apiRender(id){
    const dados = await fetch(`
    https://api-agenda.cyclic.app/contatos/${id}`)
        .then(result => result.json())
            .then(data => {return data})
                .catch((e)=> {return false});
    return dados;
}