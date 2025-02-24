
// Funções para as descrições dos projetos
function toggleDescription(projectNumber) {
  const description = document.getElementById(`desc${projectNumber}`);
  if (description) {
    if (description.style.display === "none" || description.style.display === "") {
      closeAllDescriptions();
      description.style.display = "block";
    } else {
      description.style.display = "none";
    }
  }
}

function closeAllDescriptions() {
  const descriptions = document.querySelectorAll('.description');
  descriptions.forEach(desc => {
    desc.style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Listener para cliques fora da descrição
  document.addEventListener('click', function (event) {
    const descriptions = document.querySelectorAll('.description');
    const icons = document.querySelectorAll('.icon');
    let isClickInsideDescription = false;
    let isClickOnIcon = false;

    descriptions.forEach(desc => {
      if (desc.contains(event.target)) {
        isClickInsideDescription = true;
      }
    });

    icons.forEach(icon => {
      if (icon.contains(event.target)) {
        isClickOnIcon = true;
      }
    });

    if (!isClickInsideDescription && !isClickOnIcon) {
      closeAllDescriptions();
    }
  });

  // Listener para o email
  const emailLink = document.querySelector('.contato-links a[href^="mailto"]');
  if (emailLink) {
    emailLink.addEventListener('click', function (e) {
      e.preventDefault();
      const email = 'nitrento1003@hotmail.com';
      navigator.clipboard.writeText(email).then(() => {
        alert('E-mail copiado para a área de transferência!');
      });
    });
  }

  // Botão de voltar ao topo
  const btnTopo = document.getElementById('btn-topo');
  if (btnTopo) {
    window.onscroll = function () {
      if (window.scrollY > 20) {
        btnTopo.style.display = 'block';
      } else {
        btnTopo.style.display = 'none';
      }
    };

    btnTopo.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const elementos = document.querySelectorAll(".animate");

  function verificaVisibilidade() {
    elementos.forEach((elemento) => {
      const posicaoElemento = elemento.getBoundingClientRect().top;
      const alturaJanela = window.innerHeight;

      // Verifica se o elemento está visível na tela
      if (posicaoElemento < alturaJanela * 0.9) {
        elemento.classList.add("visible");
      }
    });
  }

  // Executa a função ao carregar a página e ao rolar
  window.addEventListener("scroll", verificaVisibilidade);
  verificaVisibilidade(); //  verifica a carga inicial
});
