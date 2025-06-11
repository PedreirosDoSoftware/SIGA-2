
    const form = document.getElementById('form-recomendacao');
    const lista = document.getElementById('lista');

    function carregarRecomendacoes() {
      const dados = JSON.parse(localStorage.getItem('recomendacoes')) || [];
      lista.innerHTML = '';
      dados.forEach((rec, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>[${rec.tipo.toUpperCase()}]</strong> <a href="${rec.link}" target="_blank">${rec.titulo}</a>`;
        lista.appendChild(li);
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const titulo = document.getElementById('titulo').value;
      const link = document.getElementById('link').value;
      const tipo = document.getElementById('tipo').value;

      const novaRecomendacao = { titulo, link, tipo };
      const recomendacoes = JSON.parse(localStorage.getItem('recomendacoes')) || [];
      recomendacoes.push(novaRecomendacao);
      localStorage.setItem('recomendacoes', JSON.stringify(recomendacoes));

      form.reset();
      carregarRecomendacoes();
      
    });

    