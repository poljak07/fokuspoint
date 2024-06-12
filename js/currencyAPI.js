document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'API_KEY';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`;
    let eurToUsdRate = 0;

    // Funkcija za dohvaćanje tečaja
    function fetchExchangeRate() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    eurToUsdRate = data.conversion_rates.USD;
                    document.getElementById('rate').textContent = `1 EUR = ${eurToUsdRate} USD`;
                } else {
                    document.getElementById('rate').textContent = 'Nije moguće dohvatiti tečaj.';
                }
            })
            .catch(error => {
                document.getElementById('rate').textContent = 'Dogodila se greška pri dohvaćanju podataka.';
                console.error('Error fetching exchange rate:', error);
            });
    }

    // Funkcija za ažuriranje cijena u tablici
    function updatePrices(currency) {
        const prices = document.querySelectorAll('.price');
        prices.forEach(price => {
            const eurPrice = parseFloat(price.getAttribute('data-eur'));
            if (currency === 'EUR') {
                price.textContent = `${eurPrice} EUR`;
            } else if (currency === 'USD' && eurToUsdRate !== 0) {
                const usdPrice = (eurPrice * eurToUsdRate).toFixed(2);
                price.textContent = `${usdPrice} USD`;
            }
        });
        document.getElementById('currency-note').textContent = `Sve cijene su izražene u ${currency === 'EUR' ? 'eurima' : 'dolarima'}.`;
    }

    // Event listeneri za gumbe
    document.getElementById('eurBtn').addEventListener('click', function() {
        updatePrices('EUR');
    });

    document.getElementById('usdBtn').addEventListener('click', function() {
        updatePrices('USD');
    });

    // Dohvati tečaj pri učitavanju stranice
    fetchExchangeRate();
});
