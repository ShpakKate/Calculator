import('./scss/main.scss');

function regimeCalcChange() {
    if (calculator.classList.contains('calc-small-screen')) {
        calculator.classList.remove('calc-small-screen');
        calculator.classList.add('calc-full-screen');
        screen.classList.add('calc-screen-full-size');
    } else {
        calculator.classList.remove('calc-full-screen');
        calculator.classList.add('calc-small-screen');
        screen.classList.remove('calc-screen-full-size');
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const screen = document.querySelector('#screen');
    const calculator = document.querySelector('#calculator');
    const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const action = ['+', '-', '÷', 'X'];

    let a = '';
    let b = '';
    let sign = '';
    let finish = false;
    let arrStr = [];
    screen.textContent = '';

    function clearNum() {
        a = '';
        b = '';
        sign = '';
        finish = false;
        arrStr = [];
    }

    function checkSizeColorScreen() {
        screen.classList.remove('screen-size');
        screen.style.color = '';
    }

    function clearScreen() {
        clearNum();
        checkSizeColorScreen();

        screen.textContent = 0;
    }

    function operandSelection(operand) {
        checkSizeColorScreen();

        sign = operand;
        screen.textContent = sign;

        console.log(a, sign, b);
    }

    function noMultiNull(num) {
        if ((a === '0' || a === '') && num === '0' && a !== '.') {
            a = '';
            return;
        }

        if ((b === '0' || b === '') && num === '0' && b !== '.') {
            b = '';
            return;
        }
    }

    function numbersSelection(num) {
        checkSizeColorScreen();
        noMultiNull(num);

        if (b === '' && sign === '') {
            a += num;
            screen.textContent = a;

            console.log(a, sign, b);
        }
        else if (b !== '' && sign !== '' && finish) {
            b = num;
            finish = false;
            screen.textContent = b;

            console.log(a, sign, b);
        }
        else {
            b += num;
            screen.textContent = b;

            console.log(a, sign, b);
        }
        return;
    }

    function resultCalculation() {
        if (b === '' && sign !== '÷') b = a;

        switch (sign) {
            case ('+'):
                a = +a + (+b);
                break;
            case ('-'):
                a = a - b;
                break;
            case ('÷'):
                if (b === '' || b === '0') {
                    screen.style.color = 'red';
                    screen.classList.add('screen-size');
                    screen.textContent = 'на 0 делить нельзя';

                    clearNum();
                    return;
                } else a = a / b;
                break;
            case ('X'):
                a = a * b;
                break;
        }

        Math.round(a);

        screen.textContent = a;
        finish = true;

        console.log(a, sign, b);
    }

    function changePlusMinus() {
        if (sign === '' || finish) {
            a = a - a * 2;
            screen.textContent = a;
        } else {
            b = b - b * 2;
            screen.textContent = b;
        }

        console.log(a, sign, b)
    }

    function percentCount(sign) {
        if (b === '' || finish) {
            a = a / 100;
        } else
            switch (sign) {
                case ('+'):
                    a = +a + (+b) * (+a) / 100;
                    break;
                case ('-'):
                    a = a - b * a / 100;
                    break;
                case ('÷'):
                    a = a / b / 100;
                    break;
                case ('X'):
                    a = a * b / 100;
                    break;
            }

        Math.round(a);
        resultCheck(a);

        screen.textContent = a;
        finish = true;

        console.log(a, sign, b);
    }

    function resultCheck(result) {
        arrStr = result.toString().split('');

        if (arrStr.length > 9) {
            screen.classList.add('screen-size');
        }
    }

    document.querySelector('#buttons').addEventListener('click', event => {

        const key = event.target.textContent;

        if (digit.includes(key)) {
            numbersSelection(key);
        }

        if (action.includes(key)) {
            operandSelection(key);
        }

        if (event.target == document.querySelector('#ac')) {
            clearScreen();
        }

        if (event.target === document.querySelector('#equal')) {
            resultCalculation();
        }

        if (event.target === document.querySelector('#plus-minus')) {
            changePlusMinus(key);
        }

        if (event.target === document.querySelector('#dot')) {
        }

        if (event.target === document.querySelector('#percent')) {
            percentCount(sign);
        }

        resultCheck(a);
    });

    document.querySelector('#calc-control').addEventListener('click', event => {

        if (event.target === document.querySelector('#close')) {
            calculator.classList.add('hidden');
        }

        if (event.target === document.querySelector('#full-screen-btn')) {
            regimeCalcChange();
        }
    })
});