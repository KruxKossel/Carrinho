document.addEventListener('DOMContentLoaded', function() {
    // Obter o identificador do produto da URL
    let urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id');

    // Carregar produtos do localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let product = products.find(p => p.id === productId);

    // Exibir os detalhes do produto
    if (product) {
        let productDetails = document.getElementById('productDetails');
        productDetails.innerHTML = `
            <p><strong>Nome:</strong> ${product.name}</p>
            <p><strong>Descrição:</strong> ${product.description}</p>
            <p><strong>Valor:</strong> R$ ${product.price.toFixed(2)}</p>
            <p><strong>Disponível para venda:</strong> ${product.available}</p>
        `;
    } else {
        document.getElementById('productDetails').innerText = 'Produto não encontrado.';
    }
});
