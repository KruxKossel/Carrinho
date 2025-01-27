document.addEventListener('DOMContentLoaded', function() {
    // Função para gerar um identificador único (UUID)
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Função para atualizar o contador de caracteres
    function updateCharCount() {
        const descriptionField = document.getElementById('productDescription');
        const charCount = document.getElementById('charCount');
        charCount.innerText = `${descriptionField.value.length}/500 caracteres`;
    }

    // Atualiza o contador de caracteres quando a página é carregada
    if (document.getElementById('productDescription')) {
        document.getElementById('productDescription').addEventListener('input', updateCharCount);
        updateCharCount();
    }

    // Função para salvar produto e redirecionar para a página de listagem
    if (document.getElementById('productForm')) {
        document.getElementById('productForm').addEventListener('submit', function(event) {
            event.preventDefault();

            // Obter valores do formulário
            let name = document.getElementById('productName').value;
            let description = document.getElementById('productDescription').value;
            let price = parseFloat(document.getElementById('productPrice').value);
            let available = document.getElementById('productAvailable').value;
            let id = generateUUID(); // Gerar identificador único

            // Salvar produto no localStorage
            let products = JSON.parse(localStorage.getItem('products')) || [];
            products.push({ id, name, description, price, available });
            localStorage.setItem('products', JSON.stringify(products));

            // Redirecionar para a página de listagem
            window.location.href = 'produtos.html';
        });
    }

    // Função para carregar produtos na página de listagem
    if (document.getElementById('productList')) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        let productList = document.getElementById('productList').getElementsByTagName('tbody')[0];

        products.sort((a, b) => a.price - b.price); // Ordenar por valor do menor para o maior
        products.forEach((product) => {
            let newRow = productList.insertRow(productList.rows.length);
            newRow.insertCell(0).innerText = product.name;
            newRow.insertCell(1).innerText = product.price.toFixed(2);

            // Adiciona o botão de detalhes
            let detailsCell = newRow.insertCell(2);
            detailsCell.className = 'details-cell';
            let detailsButton = document.createElement('button');
            detailsButton.innerText = 'Detalhes';
            detailsButton.addEventListener('click', function() {
                window.location.href = `detalhes.html?id=${product.id}`;
            });
            detailsCell.appendChild(detailsButton);
        });
    }

    // Função para navegar para a página de cadastro ao clicar no botão
    if (document.getElementById('newProductButton')) {
        document.getElementById('newProductButton').addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // Função para navegar para a página de listagem ao clicar no botão
    if (document.getElementById('viewProductsButton')) {
        document.getElementById('viewProductsButton').addEventListener('click', function() {
            window.location.href = 'produtos.html';
        });
    }

    // Função para limpar o localStorage ao clicar no botão com confirmação
    if (document.getElementById('resetStorageButton')) {
        document.getElementById('resetStorageButton').addEventListener('click', function() {
            if (confirm('Você realmente deseja limpar a lista de produtos?')) {
                localStorage.removeItem('products');
                window.location.reload(); // Recarrega a página para atualizar a lista
            }
        });
    }
});
