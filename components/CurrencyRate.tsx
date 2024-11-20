'use client'

import { useState, useEffect } from 'react'

const CurrencyRate = () => {
    const [rate, setRate] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [isDefault, setIsDefault] = useState<boolean>(false)

    const fetchRate = async () => {
        try {
            const response = await fetch('/.netlify/functions/getCurrency')
            if (!response.ok) throw new Error('Ошибка сети')

            const data = await response.json()

            setRate(data.rate)
            setIsDefault(data.isDefault)
            setLoading(false)
        } catch (err) {
            console.error('Ошибка получения курса:', err)
            setRate('0- ошибка запроса к ATB')
            setIsDefault(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRate()
        const interval = setInterval(fetchRate, 2 * 60 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    if (loading)
        return <div className="currency-display">Загрузка курса...</div>

    return (
        <div className="currency-display">
            <h3 style={{ color: 'white' }}>Текущий курс CNY от ATB:</h3>
            <p>{rate} ₽</p>
            {isDefault && (
                <small
                    style={{
                        color: 'white',
                        display: 'block',
                        marginTop: '2px',
                    }}
                >
                    * Используется стандартное значение курса
                </small>
            )}
        </div>
    )
}

export default CurrencyRate
