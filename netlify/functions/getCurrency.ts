import axios from 'axios'
import * as cheerio from 'cheerio'

export const handler = async () => {
    try {
        const response = await axios.get('https://www.atb.su/')
        const $ = cheerio.load(response.data)

        let rate = ''

        $('.currency-table__tr').each((_, element) => {
            const currency = $(element)
                .find('.currency-table__td--tr-name')
                .text()
            if (currency.includes('CNY')) {
                rate = $(element).find('.currency-table__td:last').text().trim()
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify({ rate }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch currency rate' }),
        }
    }
}
