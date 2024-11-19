const Main = () => {
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
