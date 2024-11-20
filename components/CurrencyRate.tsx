'use client'

import { useState, useEffect } from 'react'

const CurrencyRate = () => {
    const [rate, setRate] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    const fetchRate = async () => {
        try {
            const response = await fetch('/.netlify/functions/getCurrency')
            const data = await response.json()

            if (data.rate) {
                setRate(data.rate)
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            setError('Ошибка при получении курса')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRate()

        // Обновление каждые 2 часа
        const interval = setInterval(fetchRate, 2 * 60 * 60 * 1000)

        return () => clearInterval(interval)
    }, [])

    if (loading) return <div>Загрузка курса...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="currency-display">
            <h3>Текущий курс CNY:</h3>
            <p>{rate} ₽</p>
        </div>
    )
}

export default CurrencyRate
