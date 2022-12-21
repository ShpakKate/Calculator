import('./scss/main.scss')

document.addEventListener("DOMContentLoaded", () => {

    const screen = document.querySelector('#screen');
    const buttonsField = document.querySelector('#buttons');
    const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const action = ['+', '-', '÷', 'X'];

    let a = '';
    let b = '';
    let sign = '';
    screen.textContent = '';
    let finish = false;
    let arrNums = ['0'];
    let arrStr = [];
    let result = '';

    console.log(arrNums[arrNums.length - 1] === '0')

    function clearScreen() {
        a = '';
        b = '';
        sign = '';
        arrNums = ['0'];
        arrStr = [];

        screen.classList.remove('screen-font-size');
        screen.textContent = 0;
    }

    function operandSelection(operand) {
        sign = operand;
        screen.textContent = sign;
        console.log(a, sign, b);
    }

    function numbersSelection(num) {
        if (b === '' && sign === '') {
            if (arrNums.length === 1) {
                screen.textContent = '0';
                arrNums.push(num);
            }
            if (num === '0' && arrNums.length > 2 || num !== '0') {
                a += num;
                screen.textContent = a;
                arrNums.push(num);
                console.log(a, sign, b);
            } else {
                if (arrNums[arrNums.length - 1] === '0') return;
            }
        }
        else if (b !== '' && sign !== '' && finish) {
            a = result;
            b = num;
            finish = false;
            screen.textContent = b;
        }
        else {
            b += num;
            screen.textContent = b;
            console.log(a, sign, b)
        }
        return finish;
    }

    function resultCalculation(a, b, sign) {
        if (b === '') b = a;
        switch (sign) {
            case ('+'):
                a = +a + (+b);
                break;
            case ('-'):
                a = a - b;
                break;
            case ('÷'):
                if (b === '0') {
                    screen.style.color = 'red';
                    screen.textContent = 'на 0 делить нельзя';
                }
                a = a / b;
                break;
            case ('X'):
                a = a * b;
        }
        result = a;
        finish = true;
        screen.textContent = a;
        console.log(a, sign, b)
        return finish;
    }

    function changePlusMinus() {
        if (result) {
            result = result - result * 2;
            screen.textContent = result;
        } else {
            a = a - a * 2;
            console.log(a, sign, b)
            screen.textContent = a;
        }

        return finish;
    }

    function percentCount(a) {
        if (result) {
            result = result / 100;
            console.log(a, sign, b)
            screen.textContent = result;
        } else {
            a = a / 100;
            console.log(a, sign, b)
            screen.textContent = a;
            return finish;
        }
    }

    function numberCheck(num) {
        Math.round(num * 100 / 100);

        arrStr = num.toString().split('');

        if (arrStr.length > 9) {
            screen.classList.add('screen-font-size');
        }
    }

    buttonsField.addEventListener('click', event => {

        console.log(arrNums);

        const key = event.target.textContent;

        if (event.target == document.querySelector('#ac')) {
            clearScreen();
        }

        if (event.target === document.querySelector('#equal')) {
            resultCalculation(a, b, sign)
        }

        if (event.target === document.querySelector('#plus-minus')) {
            changePlusMinus(key)
        }

        if (event.target === document.querySelector('#percent')) {
            percentCount(a);
            arrNums = ['0'];
        }

        if (digit.includes(key)) {
            numbersSelection(key)
        }

        if (action.includes(key)) {
            operandSelection(key)
        }

        numberCheck(result);
        numberCheck(a);
        numberCheck(b);
    });
});