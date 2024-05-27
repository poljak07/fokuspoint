document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'cd2e7389d55c58d7dbcc9635';  // Zamijenite sa svojim API ključem
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                const rate = data.conversion_rates.USD;
                document.getElementById('rate').textContent = `1 EUR = ${rate} USD`;
            } else {
                document.getElementById('rate').textContent = 'Nije moguće dohvatiti tečaj.';
            }
        })
        .catch(error => {
            document.getElementById('rate').textContent = 'Dogodila se greška pri dohvaćanju podataka.';
            console.error('Error fetching exchange rate:', error);
        });
});