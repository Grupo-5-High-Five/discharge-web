(function () {
    emailjs.init("OZ8rhJa8zy7LblnA8");
  })();
  
  document.getElementById("input_celular").addEventListener("input", function (e) {
    const celular = e.target;
    celular.value = celular.value.replace(/\D/g, "");
  
    if (celular.value.length > 11) {
      celular.value = celular.value.slice(0, 11);
    }
  });
  
  document.getElementById("contatoForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const nome = document.getElementById("input_nome").value;
    const sobrenome = document.getElementById("input_sobrenome").value;
    const email = document.getElementById("input_email").value;
    const celular = document.getElementById("input_celular").value;
  
    const telefoneRegex = /^[0-9]{10,11}$/;
    const temSequenciaRepetitiva =
      /^(.)\1{9,}$/.test(celular) ||
      /(\d)\d\1\d\1\d\1/.test(celular) ||
      /(\d)(\d)\1\2{4,}/.test(celular);
  
    // Validação: Nome, Sobrenome, e Email
    if (!nome || !sobrenome || !email) {
      Swal.fire({
        icon: "error",
        title: "Campo obrigatório!",
        text: "Por favor, preencha todos os campos.",
        timer: 2000,
        showConfirmButton: false,
      });
      return; // Para a execução do envio.
    }
  
    // Validação: Número de celular
    if (!telefoneRegex.test(celular)) {
      Swal.fire({
        icon: "error",
        title: "Número inválido!",
        text: "Por favor, insira um número de telefone válido.",
        timer: 2000,
        showConfirmButton: false,
      });
      return; // Para a execução do envio.
    }
  
    // Validação: Sequência repetitiva
    if (temSequenciaRepetitiva) {
      Swal.fire({
        icon: "error",
        title: "Número inválido!",
        text: "Por favor, evite números com sequência repetitiva.",
        timer: 2000,
        showConfirmButton: false,
      });
      return; // Para a execução do envio.
    }
  
    // Exibir mensagem de sucesso enquanto envia
    Swal.fire({
      icon: "success",
      title: "Enviando...",
      text: "Seu formulário está sendo enviado.",
      timer: 2000,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      emailjs
        .send("service_50vdoe9", "template_tn9vkl7", {
          from_name: `${nome} ${sobrenome}`,
          from_email: email,
          celular: celular,
          message: `Mensagem recebida de ${nome} ${sobrenome}, telefone: ${celular}, email: ${email}`,
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Enviado!",
            text: "Seu formulário foi enviado com sucesso.",
          });
          document.getElementById("contatoForm").reset(); // Limpa o formulário.
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Erro!",
            text: "Ocorreu um problema ao enviar o formulário.",
          });
        });
    });
  });
  