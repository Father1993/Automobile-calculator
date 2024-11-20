import axios from 'axios'
import * as cheerio from 'cheerio'

export const handler = async () => {
    try {
        // Добавляем заголовки и прокси
        console.log('Начинаем запрос к ATB...')
        const response = await axios.get('https://www.atb.su/', {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
            },
            timeout: 10000,
            // proxy: {
            //     host: 'proxy.crawlera.com',
            //     port: 8010,
            //     auth: {
            //         username: process.env.PROXY_USERNAME || '',
            //         password: process.env.PROXY_PASSWORD || '',
            //     },
            // },
        })

        console.log('Ответ получен, парсим HTML...')

        const $ = cheerio.load(response.data)
        let rate = ''

        $('.currency-table__tr').each((_, element) => {
            const currency = $(element)
                .find('.currency-table__td--tr-name')
                .text()
            console.log('Найденная валюта:', currency)
            if (currency.includes('CNY')) {
                rate = $(element).find('.currency-table__td:last').text().trim()
                console.log('Найден курс CNY:', rate)
            }
        })

        // Если курс не найден, возвращаем дефолтное значение
        if (!rate) {
            return {
                statusCode: 200,
                body: JSON.stringify({ rate: '0', isDefault: true }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ rate, isDefault: false }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }
    } catch (error: unknown) {
        console.error(
            'Ошибка парсинга:',
            error instanceof Error ? error.message : 'Неизвестная ошибка'
        )

        // Проверяем, является ли ошибка AxiosError
        if (axios.isAxiosError(error) && error.response) {
            console.error('Статус ответа:', error.response.status)
            console.error('Заголовки ответа:', error.response.headers)
        }

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Ошибка при получении курса валюты',
                isDefault: true,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }
    }
}
