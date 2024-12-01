var fkEmpresa = sessionStorage.ID_EMPRESA;

async function cadastrarFuncionario() {
  const { value: formValues } = await Swal.fire({
    title: `Cadastrar novo funcionário`,
    showCancelButton: true,
    confirmButtonText: "Cadastrar",
    confirmButtonColor: "#3085d6",
    cancelButtonText: `Cancelar`,
    cancelButtonColor: "#d33",
    html: `
    <div class="edit_modal"> 

      <div class="edit_input">
        <p>Nome:</p>
        <input id="swal-input1" class="swal-input" placeholder="Nome do Funcionário">
      </div>

      <div class="edit_input">
        <p>CPF:</p>
        <input id="swal-input2" class="swal-input" placeholder="XXX.XXX.XXX-XX">
      </div>
      
      <div class="edit_input">
        <p>E-mail:</p>
        <input id="swal-input3" type="email" class="swal-input" placeholder="E-mail do Funcionário">
      </div>
  
      <div class="edit_input">
        <p>Senha:</p>
        <input id="swal-input4" type="password" class="swal-input" placeholder="Senha do Funcionário">
      </div>

      <div class="edit_input">
        <p class="p_min">Repetir senha:</p>
        <input id="swal-input5" type="password" class="swal-input" placeholder="Confirme a senha">
      </div>

      <div class="edit_input"> 
        <p>Cargo:</p>
         <select id="swal-input6" class="swal-input" title="slc_cargo">
          <option value="admin">Admin</option>
          <option value="eletricista">Eletricista</option>
          <option value="financeiro">Financeiro</option>
        </select>
      </div>

    </div>
  `,
    preConfirm: () => {
      const nome = document.getElementById("swal-input1").value;
      const cpf = document.getElementById("swal-input2").value.replace(/[.\-]/g, "");
      const email = document.getElementById("swal-input3").value;
      const senha = document.getElementById("swal-input4").value;
      const confirmarSenha = document.getElementById("swal-input5").value;

      if (!nome || nome.length <= 3) {
        Swal.showValidationMessage("O nome deve conter mais de 3 caracteres");
        return false;
      }
      if (!cpf || cpf.length !== 11) {
        Swal.showValidationMessage("Verifique se inseriu o CPF de acordo com a máscara");
        return false;
      }
      if (!email || email.indexOf("@") === -1) {
        Swal.showValidationMessage("O e-mail é inválido. Verifique o endereço.");
        return false;
      }
      if (!senha || senha !== confirmarSenha) {
        Swal.showValidationMessage("As senhas não coincidem.");
        return false;
      }

      return {
        nome: document.getElementById("swal-input1").value,
        cpf: document.getElementById("swal-input2").value,
        email: document.getElementById("swal-input3").value,
        senha: document.getElementById("swal-input4").value,
        cargo: document.getElementById("swal-input6").value,
      };
    },
  });

  if (formValues) {
    cadastrar(formValues);
  }
}

function cadastrar(formValues) {
  var nomeVar = formValues.nome;
  var senhaVar = formValues.senha;
  var emailVar = formValues.email;
  var cpfVar = formValues.cpf.replace(/[.\-]/g, "");
  var tipoVar = formValues.cargo;

  fetch(`/usuario/cadastrar/${fkEmpresa}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      emailServer: emailVar,
      cpfServer: cpfVar,
      tipoServer: tipoVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);
      if (resposta.ok) {
        let timerInterval;
        Swal.fire({
          showConfirmButton: false,
          title: "Cadastrado com sucesso!",
          html: "A página será recarregada, aguarde um instante.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            let timerBar = document.querySelector(".swal2-timer-progress-bar");
            timerBar.style.backgroundColor = "#80f73b";
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            window.location.href = "./funcionario.html";
          }
        });
      } else {
        let timerInterval;
        Swal.fire({
          showConfirmButton: false,
          title: "Houve um erro ao cadastrar!",
          html: "Entre em contato com o suporte ou tente novamente mais tarde.",
          icon: "failed",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            let timerBar = document.querySelector(".swal2-timer-progress-bar");
            timerBar.style.backgroundColor = "#d33";
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

function validarCad(mensagem) {
  Swal.fire({
    showConfirmButton: false,
    title: "Campo inválido!",
    html: `${mensagem}`,
    icon: "failed",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      let timerBar = document.querySelector(".swal2-timer-progress-bar");
      timerBar.style.backgroundColor = "#d33";
    },
  });
}

function listarFuncionarios() {
  fetch(`/usuario/listarFuncionarios/${fkEmpresa}`, {
    method: "GET",
  })
    .then(function (resposta) {
      resposta.json().then((funcionarios) => {
        // Criando Tabela e Definindo campos com base no Select
        function tableItems() {
          let bodyTable = document.getElementById("tbody_items");

          for (let i = 0; i < funcionarios.length; i++) {
            let funcionario = funcionarios[i];

            let linha = document.createElement("tr");
            linha.dataset.id = funcionario.id;
            linha.dataset.nome = funcionario.nome;
            linha.dataset.email = funcionario.email;
            linha.dataset.senha = funcionario.senha;
            bodyTable.appendChild(linha);

            let nome = funcionario.nome;
            let celNome = document.createElement("td");
            celNome.textContent = nome;
            linha.appendChild(celNome);

            let email = funcionario.email;
            let celEmail = document.createElement("td");
            celEmail.textContent = email;
            linha.appendChild(celEmail);

            let cargo = funcionario.cargo;
            if (cargo == "financeiro") {
              cargo = "Financeiro";
            } else if (cargo == "eletricista") {
              cargo = "Eletricista";
            } else {
              cargo = "Admin";
            }
            linha.dataset.cargo = cargo;
            linha.dataset.cargoSelect = funcionario.cargo;
            let celCargo = document.createElement("td");
            celCargo.textContent = cargo;
            linha.appendChild(celCargo);

            let situacao = funcionario.status_funcionario;
            if (situacao == "ativo") {
              situacao = "Ativo";
            } else {
              situacao = "Inativo";
            }
            let celSit = document.createElement("td");
            celSit.textContent = situacao;
            linha.appendChild(celSit);

            let celAction = document.createElement("td");
            celAction.classList.add("align_action");
            celAction.innerHTML = `
              <div class="edit" onclick="editarFuncionario(event)"></div> 
              <div class="delete" onclick="deletarFuncionario(event)"></div>
            `;
            linha.appendChild(celAction);
          }
        }

        $(document).ready(function () {
          tableItems();

          let table = new DataTable("#myTable", {
            responsive: true,
            lengthChange: false,
            language: {
              info: "Páginas _PAGE_ de _PAGES_",
              infoEmpty: "Nenhum registro disponível",
              infoFiltered: "(filtrado de _MAX_ registros totais)",
              lengthMenu: "_MENU_ Registros por páginas",
              zeroRecords: "Nada encontrado",
              search: "Faça sua pesquisa:",
              searchPlaceholder: "Pesquisar",
              paginate: {
                previous: "Anterior",
                next: "Próximo",
              },
            },
            columnDefs: [
              {
                targets: 4,
                searchable: false,
                orderable: false,
              },
            ],
            order: [[0, "asc"]],
            dom: '<"custom-header"lf>rt<"custom-footer"ip>',
          });

          const divSep = $('<div class="div_sep"></div>');
          divSep.append($(".custom-header"));
          divSep.append($("#myTable"));
          $(".custom-footer").before(divSep);
        });
      });
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

async function editarFuncionario(event) {
  const button = event.currentTarget;
  const linha = button.closest("tr");

  const func = {
    id: linha.dataset.id,
    nome: linha.dataset.nome,
    email: linha.dataset.email,
    senha: linha.dataset.senha,
    cargo: linha.dataset.cargo,
    cargoSelect: linha.dataset.cargoSelect,
  };

  const { value: formValues } = await Swal.fire({
    title: `Editar: ${func.nome}`,
    showCancelButton: true,
    confirmButtonText: "Alterar",
    confirmButtonColor: "#3085d6",
    cancelButtonText: `Cancelar`,
    cancelButtonColor: "#d33",
    html: `
    <div class="edit_modal"> 

      <div class="edit_input">
        <p>Nome:</p>
        <input id="swal-input1" class="swal-input" placeholder="Nome do Funcionário" value="${func.nome}">
      </div>
      
      <div class="edit_input">
        <p>E-mail:</p>
        <input id="swal-input2" class="swal-input" placeholder="E-mail do Funcionário" value="${func.email}">
      </div>
  
      <div class="edit_input">
        <p>Senha:</p>
        <input id="swal-input3" type="password" class="swal-input" placeholder="Senha do Funcionário" value="${func.senha}">
      </div>

      <div class="edit_input"> 
        <p>Cargo:</p>
         <select id="swal-input4" class="swal-input" title="slc_cargo">
          <option value="admin">Admin</option>
          <option value="eletricista">Eletricista</option>
          <option value="financeiro">Financeiro</option>
        </select>
      </div>

    </div>
  `,
    didOpen: () => {
      const selectElement = document.getElementById("swal-input4");
      for (const option of selectElement.options) {
        if (option.value == func.cargoSelect) {
          option.selected = true;
          break;
        }
      }
    },
    preConfirm: () => {
      return {
        nome: document.getElementById("swal-input1").value,
        email: document.getElementById("swal-input2").value,
        senha: document.getElementById("swal-input3").value,
        cargo: document.getElementById("swal-input4").value,
      };
    },
  });

  if (formValues) {
    confirmar(func, formValues);
  }
}

function confirmar(func, values) {
  Swal.fire({
    title: "Realizar alterações?",
    text: `Cofirmando você estará realizando alterções no funcionário(a) ${func.nome}!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#46c948",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, desejo alterar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      atualizarFuncionario(func.id, values);
    }
  });
}

function atualizarFuncionario(id, values) {
  fetch(`/usuario/atualizarFuncionario/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: values.nome,
      email: values.email,
      senha: values.senha,
      cargo: values.cargo,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        return resposta.json();
      } else if (resposta.status == 404) {
        throw new Error("404 nas alterações");
      } else {
        throw new Error(`Houve um erro ao tentar alterar usuário: ${resposta.status}`);
      }
    })
    .then(function (dados) {
      let timerInterval;
      Swal.fire({
        showConfirmButton: false,
        title: "Alterado com sucesso!",
        html: "A página será recarregada, aguarde um instante.",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          let timerBar = document.querySelector(".swal2-timer-progress-bar");
          timerBar.style.backgroundColor = "#80f73b";
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.href = "./funcionario.html";
        }
      });
    })
    .catch(function (erro) {
      window.alert(`Erro ao atualizar: ${erro.message}`);
      console.error(`#ERRO: ${erro}`);
    });
}

async function deletarFuncionario(event) {
  const button = event.currentTarget;
  const linha = button.closest("tr");

  const func = {
    id: linha.dataset.id,
    nome: linha.dataset.nome,
  };

  Swal.fire({
    title: "Deletar funcionário",
    text: `Deseja deletar o funcionário(a) ${func.nome}!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#46c948",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, desejo deletar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      desativarUsuario(func.id);
    }
  });
}

function desativarUsuario(id) {
  fetch(`/usuario/desativarFuncionario/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.ok) {
        let timerInterval;
        Swal.fire({
          showConfirmButton: false,
          title: "Deletado com sucesso!",
          html: "A página será recarregada, aguarde um instante.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            let timerBar = document.querySelector(".swal2-timer-progress-bar");
            timerBar.style.backgroundColor = "#80f73b";
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            window.location.href = "./funcionario.html";
          }
        });
      } else if (resposta.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw "Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status;
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}
