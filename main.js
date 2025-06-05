document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('total-alunos').textContent = '120';
    document.getElementById('total-turmas').textContent = '8';
    document.getElementById('total-pendencias').textContent = '5';

    const alunos = [
        { nome: 'João Silva', turma: 'Turma A', status: 'active' },
        { nome: 'Maria Souza', turma: 'Turma B', status: 'active' },
        { nome: 'Carlos Oliveira', turma: 'Turma C', status: 'inactive' }
    ];

    const tabela = document.querySelector('#tabela-alunos tbody');
    alunos.forEach(aluno => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.turma}</td>
            <td><span class="status ${aluno.status}">${aluno.status === 'active' ? 'Ativo' : 'Inativo'}</span></td>
        `;
        tabela.appendChild(row);
    });
});