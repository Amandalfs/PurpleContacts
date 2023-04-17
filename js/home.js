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