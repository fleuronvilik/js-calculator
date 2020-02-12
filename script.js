const digits = document.querySelectorAll(".btn-outline-secondary")
const operators = document.querySelectorAll(".col-3 .btn + .btn")
const display = document.querySelector("h1")
const equals = document.querySelector(".col-9 .btn-primary")
const clear = document.querySelector(".col-3 .btn:first-child")

let ans = 0
display.textContent = ans
let operand = exp = display.textContent
let op = ""

digits.forEach(btn => btn.addEventListener("click", printDigit))

clear.addEventListener("click", function() {
  ans = 0
  display.textContent = ans
  operand = exp = "0"
  op = ""
});

operators.forEach(operator => {operator.addEventListener("click", updateInput)})

equals.addEventListener("click", function() {
    exp = `${eval(exp)}`
    display.textContent = exp
    operand = "0"
})

function printDigit() {
  switch(this.textContent) {
    case ".":
      if (!/\./.test(operand)) {
        display.textContent += this.textContent;
        operand += this.textContent;
        exp += this.textContent
      }
      break

    case "0":
      if (!/^[-+×÷]?0$/.test(operand)) {
        operand += this.textContent
        display.textContent += this.textContent
        exp += this.textContent
      }
      break

    default:
      if (!/^-?0.?$/.test(operand)) {
        display.textContent += this.textContent
        operand += this.textContent
        exp += this.textContent
      } else {
        operand = this.textContent

        if (/[+×÷-]0$/.test(display.textContent)) {
          display.textContent = display.textContent.slice(0, -1) + this.textContent
          exp = exp.slice(0, -1) + this.textContent
        } else if (/[+×÷-](\d*.)?$/.test(display.textContent)) {
          display.textContent += this.textContent
          exp += this.textContent
        } else {
          display.textContent = this.textContent
          exp = this.textContent
        }
      }
      break
  }
}

function updateInput() {
  if (!/[+×÷-]/.test(display.textContent)) {
    op = this.textContent
    display.textContent += op
    
    exp += this.dataset.eval
  } else {
    const regex = new RegExp("[0-9]+", "g")

    let lastInput = regex.lastIndex
    while (regex.test(display.textContent)) {
      lastInput = regex.lastIndex;
    }

    switch(this.textContent) {
      case "-": //Si - est saisi après un opérateur
        if ("+-".includes(op)) {
          op = this.textContent
          display.textContent = display.textContent.slice(0, lastInput) + op
          exp = exp.slice(0, lastInput) + this.dataset.eval
        } else if (display.textContent == "0") {
           display.textContent = this.textContent
           exp = this.dataset.eval
        } else {
          op = this.textContent;
          display.textContent += this.textContent
          exp += this.dataset.eval
        }
        break

      default:
        if ("+-×÷".includes(op)) {
          op = this.textContent
          display.textContent = display.textContent.slice(0, lastInput) + op
          exp = exp.slice(0, lastInput) + this.dataset.eval
        } else {
          op = this.textContent
          display.textContent += op
          exp += this.dataset.eval
        }
        break
    }
  }
  operand = "0"
}
