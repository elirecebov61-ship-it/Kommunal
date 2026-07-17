// Netlify Serverless Function - Proxy
exports.handler = async (event) => {
    // Yalnız POST sorğularını qəbul et
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        // İstifadəçidən gələn məlumatları al
        const data = JSON.parse(event.body);

        // Portmanat API-yə sorğu göndər
        const response = await fetch('https://portmanat.az/transactions/update-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const cavab = await response.json();

        // Cavabı qaytar
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cavab)
        };

    } catch (error) {
        // Xəta baş verdikdə
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                status: 'error', 
                message: error.message || 'Daxili server xətası' 
            })
        };
    }
};
