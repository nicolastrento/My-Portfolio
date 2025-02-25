
// Função para verificar se um elemento está visível na tela
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
  );
}

// Função para gerenciar as animações dos elementos
function handleScroll() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in, .feature');
  
  animatedElements.forEach(element => {
      if (isElementInViewport(element)) {
          element.classList.add('visible');
      } else {
          // Remove a classe visible quando o elemento sai da tela
          element.classList.remove('visible');
      }
  });
}

// Adicionar evento de scroll
window.addEventListener('scroll', handleScroll);

// Verificar elementos visíveis na carga inicial da página
document.addEventListener('DOMContentLoaded', handleScroll);

// Form 

// Inicializa os ícones do Lucide
lucide.createIcons();

// Seleciona elementos do DOM
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const inputs = form.querySelectorAll('input, textarea');

// Objeto para armazenar os dados do formulário
const formData = {
  nome: '',
  email: '',
  telefone: '',
  mensagem: ''
};

// Função para validar o formulário
function validateForm() {
  const errors = {};
  
  // Validação do nome
  if (!formData.nome.trim()) {
    errors.nome = 'Nome é obrigatório';
  }
  
  // Validação do email
  if (!formData.email.trim()) {
    errors.email = 'Email é obrigatório';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email inválido';
  }
  
  // Validação do telefone
  if (!formData.telefone.trim()) {
    errors.telefone = 'Telefone é obrigatório';
  } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.telefone)) {
    errors.telefone = 'Formato: (99) 99999-9999';
  }
  
  // Validação da mensagem
  if (!formData.mensagem.trim()) {
    errors.mensagem = 'Mensagem é obrigatória';
  }
  
  return errors;
}

// Função para exibir erros
function showErrors(errors) {
  // Limpa mensagens de erro anteriores
  document.querySelectorAll('.error-message').forEach(element => {
    element.textContent = '';
  });
  document.querySelectorAll('.form-input').forEach(input => {
    input.classList.remove('error');
  });
  
  // Exibe novos erros
  Object.entries(errors).forEach(([field, message]) => {
    const errorElement = document.querySelector(`[data-error="${field}"]`);
    const inputElement = document.getElementById(field);
    if (errorElement) {
      errorElement.textContent = message;
    }
    if (inputElement) {
      inputElement.classList.add('error');
    }
  });
}

// Função para formatar o telefone
function formatPhone(value) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
}

// Manipulador de eventos para mudanças nos campos
inputs.forEach(input => {
  input.addEventListener('input', (e) => {
    let value = e.target.value;
    
    // Aplica formatação especial para o campo de telefone
    if (e.target.id === 'telefone') {
      value = formatPhone(value);
      e.target.value = value;
    }
    
    // Atualiza o objeto formData
    formData[e.target.id] = value;
    
    // Remove a classe de erro quando o usuário começa a digitar
    e.target.classList.remove('error');
    const errorElement = document.querySelector(`[data-error="${e.target.id}"]`);
    if (errorElement) {
      errorElement.textContent = '';
    }
  });
});

// Manipulador de evento para envio do formulário
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const errors = validateForm();
  
  if (Object.keys(errors).length === 0) {
    try {
      const formElement = e.target;
      const formData = new FormData(formElement);
      
      const response = await fetch(formElement.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Limpa o formulário
        form.reset();
        Object.keys(formData).forEach(key => {
          formData[key] = '';
        });
        
        // Mostra mensagem de sucesso
        successMessage.classList.remove('hidden');
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 5000);
      } else {
        throw new Error('Erro ao enviar o formulário');
      }
    } catch (error) {
      alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
    }
  } else {
    showErrors(errors);
  }
});

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