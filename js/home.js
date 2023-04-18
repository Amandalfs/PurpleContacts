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

    });
    
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