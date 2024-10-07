// Inicializa o EmailJS
(function(){
    emailjs.init("OZ8rhJa8zy7LblnA8"); 
})();

document.getElementById('contatoForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos campos do formulário
    const nome = document.getElementById('input_nome').value;
    const sobrenome = document.getElementById('input_sobrenome').value;
    const email = document.getElementById('input_email').value;
    const celular = document.getElementById('input_celular').value;

    // Envia o email usando EmailJS
    emailjs.send("service_50vdoe9", "template_tn9vkl7", {
        from_name: `${nome} ${sobrenome}`,
        from_email: email,
        celular: celular,
        message: `Mensagem recebida de ${nome} ${sobrenome}, telefone: ${celular}, email: ${email}`
    })
    .then(function(response) {
        alert("Email enviado com sucesso!");
        document.getElementById('contatoForm').reset(); // Limpa o formulário
    }, function(error) {
        alert("Erro ao enviar email: " + JSON.stringify(error));
    });
});
