
(function(){

    emailjs.init("OZ8rhJa8zy7LblnA8"); 

})();


document.getElementById('input_celular').addEventListener('input', function (e) {

    const celular = e.target;
    celular.value = celular.value.replace(/\D/g, '');

    if(celular.value.length > 11){
        celular.value = celular.value.slice(0, 11);
    }
});


document.getElementById('contatoForm').addEventListener('submit', function(e) {

    e.preventDefault(); 

    const nome = document.getElementById('input_nome').value;
    const sobrenome = document.getElementById('input_sobrenome').value;
    const email = document.getElementById('input_email').value;
    const celular = document.getElementById('input_celular').value;

    if(!nome || !email || !sobrenome){
        openModal("Por favor, preencha todos os campos!");
        return;
    }


    const telefoneRegex = /^[0-9]{10,11}$/;

    if(!telefoneRegex.test(celular)){
       openModal("Por favor, insira um número de telefone válido!");
       return;
    }


    const temSequenciaRepetitiva = /^(.)\1{9,}$/.test(celular) || /(\d)\d\1\d\1\d\1/.test(celular) || /(\d)(\d)\1\2{4,}/.test(celular);

    if (temSequenciaRepetitiva) {
        openModal("Por favor, evite números com sequência repetitiva.");
        return;
    }

    const submitButton = document.getElementById('enviarBotao');
    submitButton.disabled = true;

    emailjs.send("service_50vdoe9", "template_tn9vkl7", {
        from_name: `${nome} ${sobrenome}`,
        from_email: email,
        celular: celular,
        message: `Mensagem recebida de ${nome} ${sobrenome}, telefone: ${celular}, email: ${email}`
    })

    .then(function(response) {
        openModal("Email enviado com sucesso!", true);
        document.getElementById('contatoForm').reset();
        submitButton.disabled = false;

    }, function(error) {
        openModal("Erro ao enviar email: " + JSON.stringify(error), false);
        submitButton.disabled = false;
    });

});


function openModal(message, isSucess) {

    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    const modalContent = document.querySelector('.modal-content');

    modalMessage.textContent = message;
    modal.style.display = 'block';
    modal.classList.add('show');
    modalMessage.style.opacity = 1;

    if(isSucess){
        modalContent.style.backgroundColor = 'green';
    }else{
        modalContent.style.backgroundColor = 'red';
    }

    setTimeout(function () {
        modalMessage.style.transition = 'opacity 1s'; 
        modalMessage.style.opacity = 0;

        setTimeout(function () {
            modal.style.display = 'none';
            modal.classList.remove('show');
            modalMessage.style.transition = '';
        }, 1000);
    }, 3000);

}


document.getElementById('closeModal').addEventListener('click', function () {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    modal.classList.remove('show');
});


window.addEventListener('keydown', function (event) {

    if (event.key === 'Escape') {
        document.getElementById('modal').style.display = 'none';
        modal.classList.remove('show');
    }

});