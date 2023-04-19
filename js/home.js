window.addEventListener('load', ()=>{
    monstrarDados()
})


let btnsDel = document.querySelectorAll('.btn_delete');
let  modalDelete = document.querySelector('.modal_remove');
let filterDelete = document.querySelector('.filter');

const id_user = JSON.parse(localStorage.getItem('id_user', JSON.stringify)); 
let idAgenda;

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

    const btnExcluir = await document.querySelector('.modal_remove_btn_excluir');
    btnExcluir.addEventListener('click', async(e)=>{
            e.preventDefault();
            e.stopPropagation();
            const bodyDelete = {
                "id_agenda": idAgenda,
                "id_user": id_user
            }
            const myInitDelete = {
                method: 'DELETE',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(bodyDelete) 
            }

            await apiRenderDeleta(myInitDelete);

            modalDelete.style.visibility = "hidden";
            filterDelete.style.visibility = "hidden";
        }
    )
}   

const btnSair = document.querySelector('.menu_sair')
btnSair.addEventListener('click',(e)=>{
    e.preventDefault();
    localStorage.clear();
    window.location.assign('../pages/login.html')
})


async function apiRender(id){
    const dados = await fetch(`
    https://api-agenda.cyclic.app/contatos/${id}`)
        .then(result => result.json())
            .then(data => {return data})
                .catch((e)=> {return false});
    return dados;
}

async function apiRenderDeleta(myInit){
    fetch(`https://api-agenda.cyclic.app/contatos/deleta`, myInit)
        .then((result)=>{console.log(result)})
}

