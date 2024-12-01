var fkEmpresa = sessionStorage.ID_EMPRESA;
var fkUser = sessionStorage.ID_USUARIO;

function cadastrarAnotacao(event) {
  event.preventDefault();

  const input = document.getElementById("input_text");

  const textAnot = input.value.trim();
  if (!textAnot || textAnot == "") {
    Swal.fire({
      icon: "error",
      title: "Campo vazio!",
      text: "Por favor, preencha o campo antes de continuar.",
    });
    return;
  }

  Swal.fire({
    title: "Publicar anotação",
    text: `Deseja publicar essa anotação somente para você? ou para toda a sua equipe?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#46c948",
    confirmButtonText: "Publicar para mim",
    showDenyButton: true,
    denyButtonText: "Publicar para equipe",
    denyButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    let fkEmp;
    if (result.isConfirmed) {
      fkEmp = "NULL";
    } else if (result.isDenied) {
      fkEmp = fkEmpresa;
    }

    fetch(`/anotacao/publicar/${fkUser}/${fkEmp}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textServer: textAnot,
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
              window.location.href = "./anotacoes.html";
            }
          });
        } else {
          let timerInterval;
          Swal.fire({
            showConfirmButton: false,
            title: "Houve um erro ao cadastrar!",
            html: "Entre em contato com o suporte ou tente novamente mais tarde.",
            icon: "error",
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
  });
}

function listar() {
  fetch(`/anotacao/listar/${fkUser}/${fkEmpresa}`, {
    method: "GET",
  })
    .then(function (resposta) {
      resposta.json().then((anotacoes) => {
        // Post It Content

        // -----------------------------------------------------------------------
        // LISTANDO POST NA TELA
        // -----------------------------------------------------------------------

        const postIt = document.getElementById("postits");
        const postItEmp = document.getElementById("postitsemp");

        anotacoes.forEach((anotacao) => {
          // Criar o label com as classes
          let label = document.createElement("label");
          label.dataset.id = anotacao.id;

          let tipo = "p_func";

          if (anotacao.fkempresa != null) {
            tipo = "p_emp";
          }

          label.classList.add("label", "post", `${tipo}`);

          if (anotacao.fkfuncionario == fkUser) {
            // Criar o input checkbox
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("post_checkbox");
            // Criar o div com as classes

            let div = document.createElement("div");
            div.classList.add("checkmark", "hidden");
            // Adicionar checkbox e div ao label
            label.appendChild(checkbox);
            label.appendChild(div);
          }

          // Adicionar o texto digitado ao label
          let text = document.createElement("p");
          text.textContent = anotacao.texto;
          label.appendChild(text);

          // Adicionar o label ao container
          if (anotacao.fkempresa != null) {
            let funcName = document.createElement("i");
            funcName.textContent = anotacao.nome;
            label.appendChild(funcName);

            postItEmp.appendChild(label);
          } else {
            postIt.appendChild(label);
          }
        });

        // -----------------------------------------------------------------------
        // DEFINIÇÃO DE CORES DAS ANOTAÇÕES
        // -----------------------------------------------------------------------

        // Função pra mudar de cor do texto (Cálculo do Iluminação)
        function hexToRgb(hex) {
          hex = hex.replace(/^#/, "");

          let bigint = parseInt(hex, 16);
          let r = (bigint >> 16) & 255;
          let g = (bigint >> 8) & 255;
          let b = bigint & 255;
          return [r, g, b];
        }

        function getLuminance(rgb) {
          let [r, g, b] = rgb.map((c) => c / 255);
          r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
          g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
          b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }

        function isColorLight(hex) {
          let rgb = hexToRgb(hex);
          let luminance = getLuminance(rgb);
          return luminance >= 0.5;
        }

        let colorList = [
          "#FFEB3B", // Amarelo
          "#FFC107", // Laranja
          "#FF9800", // Laranja Claro
          "#E91E63", // Rosa
          "#9C27B0", // Roxo
          "#4CAF50", // Verde
          "#CDDC39", // Verde Limão
          "#FF5722", // Coral
        ];

        let posts = document.querySelectorAll(".p_func");

        for (let i = 0; i < posts.length; i++) {
          let randomColor = Math.floor(Math.random() * colorList.length);
          let chosenColor = colorList[randomColor];
          posts[i].style.backgroundColor = chosenColor;

          if (isColorLight(chosenColor)) {
            posts[i].style.color = "black";
          } else {
            posts[i].style.color = "white";
          }
        }

        let colorListEmp = [
          "#90CAF9", // Azul Claro
          "#64B5F6", // Azul Médio Claro
          "#42A5F5", // Azul Médio
          "#2196F3", // Azul Padrão
          "#1E88E5", // Azul Intenso
          "#1976D2", // Azul Escuro
          "#1565C0", // Azul Muito Escuro
          "#0D47A1", // Azul Profundo
        ];

        let postsEmp = document.querySelectorAll(".p_emp");

        for (let i = 0; i < postsEmp.length; i++) {
          let randomColor = Math.floor(Math.random() * colorListEmp.length);
          let chosenColor = colorListEmp[randomColor];
          postsEmp[i].style.backgroundColor = chosenColor;

          if (isColorLight(chosenColor)) {
            postsEmp[i].style.color = "black";
          } else {
            postsEmp[i].style.color = "white";
          }
        }

        // -----------------------------------------------------------------------
        // DEFININDO POSTs SELECIONAVEIS
        // -----------------------------------------------------------------------

        const selectAllButton = document.getElementById("select_all");
        const checkboxes = document.querySelectorAll(".post_checkbox");

        // Selecionar Todos
        let allSelected = false; // Rastreamento do estado de seleção

        selectAllButton.addEventListener("click", () => {
          allSelected = !allSelected; // Alterna o estado de seleção
          checkboxes.forEach((checkbox) => {
            checkbox.checked = allSelected; // Marca ou desmarca com base no estado
          });
        });

        // Visibilidade dos Checkbox
        const select = document.getElementById("selected");
        const hidden = document.querySelectorAll(".hidden");

        select.addEventListener("click", () => {
          hidden.forEach((item) => {
            item.classList.toggle("flex");
          });
        });
      });
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

async function confirmar(event, type) {
  // const posts = document.querySelectorAll(".post");
  const checkboxes = document.querySelectorAll(".post_checkbox");

  const selectedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked);

  if (selectedCheckboxes.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Nenhum item selecionado",
      text: "Por favor, selecione pelo menos um item para continuar.",
    });
    return;
  }

  let arraySelected = [];

  if (type === "del") {
    selectedCheckboxes.forEach((selected) => {
      const label = selected.closest("label");
      if (label) {
        arraySelected.push(label.dataset.id);
      }
    });
  }

  Swal.fire({
    title: "Deletar anotações",
    text: `Deseja deletar as alterações selecionadas?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#46c948",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, desejo deletar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      if (type === "del") {
        deletarAnotacoes(arraySelected);
      } else {
        editarAnotacao(arraySelected);
      }
    }
  });
}

function deletarAnotacoes(arrayList) {
  fetch(`/anotacao/deletar/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      deletarIdsServer: arrayList,
    }),
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
            window.location.href = "./anotacoes.html";
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

async function editarFuncionario(event) {
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

function editar(values) {
  fetch(`/usuario/editar/`, {
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

document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".post_checkbox");

  // Editar
  const editButton = document.getElementById("edit_selected"); // Botão de editar

  // Evento no botão de editar
  editButton.addEventListener("click", () => {
    const selectedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked);

    if (selectedCheckboxes.length === 0) {
      alert("Nenhum item selecionado!"); // Alerta se nada estiver selecionado
    } else if (selectedCheckboxes.length > 1) {
      alert("Apenas um item pode ser selecionado por vez!"); // Alerta se mais de um estiver selecionado
    } else {
      // Apenas um item selecionado
      const label = selectedCheckboxes[0].closest(".label"); // Captura a label correspondente
      const text = label.textContent.trim(); // Pega o texto da label
      input.value = text;
    }
  });
});
