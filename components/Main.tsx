'use client'
import { useEffect } from 'react'

const Main = () => {
    useEffect(() => {
        // Добавляю копейки к курсу на цену в Китае
        const plusCurs = Number(0.3)

        // Добавляю копейки к расходам по Китаю
        const chinaPlus = Number(0.6)

        // Добавляю 2%
        const percent = Number(1.02)

        // Получаем все необходимые элементы
        const sumBtn = document.getElementById('sumBtn')
        const checkboxNew = document.getElementById(
            'newCars'
        ) as HTMLInputElement
        const taxChina = document.getElementById('taxChina') as HTMLInputElement
        const returnMoney = document.getElementById(
            'returnMoney'
        ) as HTMLInputElement
        const textInput = document.getElementById('taxChinaExp')
        const textInputTwo = document.getElementById('taxChinaNew')

        // Проверяем существование элементов
        if (
            !sumBtn ||
            !checkboxNew ||
            !taxChina ||
            !returnMoney ||
            !textInput ||
            !textInputTwo
        ) {
            console.error('Не все элементы найдены на странице')
            return
        }

        // Задаем начальные значения и скрываем элементы
        taxChina.value = '0'
        returnMoney.value = '0'

        // Скрываем элементы изначально
        taxChina.style.display = 'none'
        returnMoney.style.display = 'none'
        textInput.style.display = 'none'
        textInputTwo.style.display = 'none'

        // Функция расчета
        function calculate() {
            const curs = document.getElementById('exchange') as HTMLInputElement
            const errorMessage = document.getElementById('error-message')

            if (!curs.value) {
                curs.style.outline = '2px solid red'
                if (errorMessage) errorMessage.textContent = 'Введите курс!'
                return
            } else {
                curs.style.outline = ''
                if (errorMessage) errorMessage.textContent = ''
            }

            const price = document.getElementById('price') as HTMLInputElement
            const expensesChina = document.getElementById(
                'expensesChina'
            ) as HTMLInputElement
            const taxRus = document.getElementById('taxRus') as HTMLInputElement
            const expensesRus = document.getElementById(
                'expensesRus'
            ) as HTMLInputElement
            const commission = document.getElementById(
                'commission'
            ) as HTMLInputElement
            const totalPrice = document.getElementById(
                'totalPrice'
            ) as HTMLInputElement

            // Получаем значение чекбокса
            const isNewCar = checkboxNew.checked

            // Расчет для нового авто
            let taxChinaVal = 0
            let returnMoneyVal = 0
            if (isNewCar) {
                const newCarCursPlus = parseFloat(curs.value) + chinaPlus
                taxChinaVal = taxChina.value
                    ? parseFloat(taxChina.value)
                    : (parseFloat(price.value) / 11.3 + 1450) * newCarCursPlus

                returnMoneyVal = parseFloat(price.value) * 0.08 * newCarCursPlus
            }

            // Основные расчеты
            // Курс + 0.30 по НЕМУ нужно считать
            const cursPlus = parseFloat(curs.value) + plusCurs
            console.log('Курс + 0.30 копеек:', cursPlus)

            const plusChina = parseFloat(curs.value) + chinaPlus
            console.log('Курс + 0.60 копеек:', plusChina)

            // Цена в рублях в Китае
            const priceRus = parseFloat(price.value) * cursPlus
            console.log('Цена в рублях: ', priceRus)

            // Расходы по Китаю в рублях
            const expensesInChina = parseFloat(expensesChina.value) * plusChina
            console.log('Расходы по китаю в рублях: ', expensesInChina)

            // Пошлина в РФ + 2%
            const dutyWithInterest = Number(
                (parseFloat(taxRus.value) * percent).toFixed(2)
            )
            console.log('Пошлина + 2%: ', dutyWithInterest)

            // Расходы в РФ в рублях
            const expensesRusInRub = parseFloat(expensesRus.value)
            console.log('Расходы в РФ в рублях: ', expensesRusInRub)

            const commissionCompany = parseFloat(commission.value)
            console.log('Комиссия компании в рублях: ', commissionCompany)

            // Итоговый расчет
            const totalResult =
                priceRus +
                taxChinaVal +
                expensesInChina +
                dutyWithInterest +
                expensesRusInRub +
                commissionCompany -
                returnMoneyVal

            console.log('Окончательная ЦЕНА В РУБЛЯХ ', totalResult)
            console.log('########################################')

            // Форматирование и вывод результата
            const totalResultFormatted = Number(
                totalResult.toFixed(2)
            ).toLocaleString('ru-RU')
            totalPrice.value = `${totalResultFormatted} ₽`
        }

        // Обработчик изменения чекбокса
        const handleCheckboxChange = () => {
            if (checkboxNew.checked) {
                taxChina.style.display = 'block'
                returnMoney.style.display = 'block'
                textInput.style.display = 'block'
                textInputTwo.style.display = 'block'
                taxChina.value = ''
                returnMoney.value = ''
            } else {
                taxChina.style.display = 'none'
                returnMoney.style.display = 'none'
                textInput.style.display = 'none'
                textInputTwo.style.display = 'none'
                taxChina.value = '0'
                returnMoney.value = '0'
            }
        }

        // Добавляем обработчики событий
        checkboxNew.addEventListener('change', handleCheckboxChange)
        sumBtn.addEventListener('click', calculate)

        // Очистка при размонтировании
        return () => {
            sumBtn.removeEventListener('click', calculate)
            checkboxNew.removeEventListener('change', handleCheckboxChange)
        }
    }, [])

    return (
        <>
            <span id="error-message" className="error"></span>
            <input
                id="exchange"
                type="number"
                placeholder="Курс юаня"
                required
            />

            <label htmlFor="">
                Новый автомобиль
                <input id="newCars" type="checkbox" />
            </label>
            <span>Цена авто в Китае</span>
            <input
                id="price"
                type="number"
                placeholder="Введите цену авто в Китае"
            />

            <span>Расходы по Китаю</span>
            <input
                id="expensesChina"
                type="number"
                placeholder="Введите расходы по Китаю"
            />
            <span>Пошлина в РФ</span>
            <input
                id="taxRus"
                type="number"
                placeholder="Введите пошлину в РФ"
            />
            <span>Расходы в РФ</span>
            <input
                id="expensesRus"
                type="number"
                placeholder="Введите расходы в РФ"
                defaultValue="95000"
            />
            <span>Комиссия компании</span>
            <input
                id="commission"
                type="number"
                placeholder="Введите комиссию компании"
            />
            <span id="taxChinaNew" className="tax-china">
                Налог на новый авто (считается автоматически, но можно ввести
                свое число)
            </span>
            <input
                id="taxChina"
                type="number"
                placeholder="Введите налог на новый авто если нужно"
            />
            <span id="taxChinaExp" className="tax-china">
                Возврат налога считается автоматически
            </span>
            <input
                id="returnMoney"
                type="number"
                placeholder="Вводить ничего не нужно!"
                readOnly
            />
            <button id="sumBtn" className="sum-btn">
                Посчитать
            </button>
            <input id="totalPrice" type="text" placeholder="Итого" />
        </>
    )
}

export default Main
