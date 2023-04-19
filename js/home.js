window.addEventListener('load', ()=>{
    monstrarDados()
})


let btnsDel = document.querySelectorAll('.btn_delete');
let  modalDelete = document.querySelector('.modal_remove');
let filterDelete = document.querySelector('.filter');



const modalEdit = document.querySelector('.modal_editar');
let formEdit = document.querySelector('.modal_editar_inputs');
const id_user = JSON.parse(localStorage.getItem('id_user', JSON.stringify)); 
let idAgenda;

let btnsEdits = document.querySelectorAll('.btn_edit');


async function monstrarDados(){
    const contatos = document.querySelector('.template_principal');
    
    const dados = await apiRender(id_user);

    console.log(dados)
    await dados.contatos.forEach((dado)=> {
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

            
        btnsDel = document.querySelectorAll('.btn_delete');
        modalDelete = document.querySelector('.modal_remove');
        filterDelete = document.querySelector('.filter');

        btnsEdits = document.querySelectorAll('.btn_edit');

    });
        


    
    for(let btnDelete of btnsDel){
        btnDelete.addEventListener('click', (e)=>{
            idAgenda = e.target.value 
            modalDelete.style.visibility = "visible";
            filterDelete.style.visibility = "visible";
        })  
    }
   
    const btnFecharDelete = document.querySelector('.modal_remove_btn_x');
    const btnCancelarDelete = document.querySelector('.modal_remove_btn_cancelar');
    for(let fecharDelete  of [btnFecharDelete, btnCancelarDelete]){
        fecharDelete.addEventListener('click',(e)=>{
            idAgenda = undefined; 
            modalDelete.style.visibility = "hidden";
            filterDelete.style.visibility = "hidden";   
            location.reload()
        })
    }





    for(let btnEdit of btnsEdits){
        btnEdit.addEventListener('click', async(e)=>{
            idAgenda = e.target.value 
            const dadosInfosEdit = await apiRenderContatoById(id_user, idAgenda);
            console.log(dadosInfosEdit, idAgenda)
            modalEdit.style.visibility = "visible";
            filterDelete.style.visibility = "visible";
            formEdit.children[0].value = dadosInfosEdit.data.contatos[0].name
            formEdit.children[1].value = dadosInfosEdit.data.contatos[0].email
            formEdit.children[2].value = dadosInfosEdit.data.contatos[0].telefone
        })  
    }  

}   

const btnExcluir = document.querySelector('.modal_remove_btn_excluir');
btnExcluir.addEventListener('click', async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        
        const resultDel = await apiRenderDeleta({
            id_agenda: Number(idAgenda),
            id_user: id_user
        });
        modalDelete.style.visibility = "hidden";
        filterDelete.style.visibility = "hidden";
        location.reload()
    }
)


const btnSair = document.querySelector('.menu_sair')
btnSair.addEventListener('click',(e)=>{
    e.preventDefault();
    localStorage.clear();
    window.location.assign('../pages/login.html')
})




const btnEditLimpar = document.querySelector('.modalEditar_btn_limpar')
btnEditLimpar.addEventListener('click',(e)=>{
    e.preventDefault()
    e.stopPropagation()

    formEdit.reset()
})

const btnEditFechar = document.querySelector('.modalEditar_add_x')
btnEditFechar.addEventListener('click', async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    modalEdit.style.visibility = "hidden";
    filterDelete.style.visibility = "hidden";
})

const btnEditarConfim = document.querySelector('.modalEditar_btn_editar');
btnEditarConfim.addEventListener('click', async(e)=>{
    e.preventDefault()
    e.stopPropagation()
    
    formEdit = document.querySelector('.modal_editar_inputs')
    const dataEdit = {
        id_agenda: idAgenda,
        name: formEdit.children[0].value,
        email: formEdit.children[1].value,
        telefone: formEdit.children[2].value,

    }
    const resultEdit = await apiRenderEditar(dataEdit, id_user)
    modalEdit.style.visibility = "hidden";
    filterDelete.style.visibility = "hidden";

    location.reload()
})




async function apiRender(id){
    const dados = await api.get(`contatos/${id}`)
        .then(result => result.data)
            .then(data => {return data})
                .catch((e)=> {return false});
    return dados;
}

async function apiRenderDeleta(dataDelete){
   return await api.delete("contatos/deleta", {data:dataDelete})
}

async function apiRenderContatoById(id_user, id_agenda){
    return api.get(`contatos/${id_user}?id_agenda=${id_agenda}`)
}


async function apiRenderEditar(data, id_user){
    return api.put(`contatos/editar/${id_user}`, data)
}