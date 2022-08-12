const $ = query => document.querySelector(query)

const btnActions = (() => {
    const dictionary = { 'e': 'enter', 'i': 'imes', 'a': 'ai', 'o': 'ober', 'u': 'ufat' }
    const output = $('#output > p')
    const message = $('#message').classList
    const showOutput = newText => {
        message.add('d-none')
        output.textContent = newText
        output.parentElement.classList.remove('d-none')
        output.scrollIntoView({ block: "start", behavior: "smooth" })
    }
    return {
        encrypt: input => showOutput(input.value.replace(/[aeiou]/gm, match => dictionary[match])),
        decrypt: input => showOutput(input.value.replace(/enter|imes|ai|ober|ufat/gm, match => match[0])),
        copy: self => {
            navigator.clipboard.writeText(output.textContent)
            self.textContent = '¡Copiado!'
            setInterval(() => self.textContent = 'Copiar', 2000);
        }
    }
})()

const btnEncrypt = $('#encrypt')
const btnDecrypt = $('#decrypt')
const form = $('form')
const textarea = $('form textarea')

form.onclick = () => textarea.focus()
form.oninput = function () {
    const invalidInput = /^\s*$|[^a-z\s!?¿?¡\.,;]/g.test(textarea.value)
    textarea.style.height = 'auto'
    textarea.value.trim() && invalidInput ? this.classList.add('invalidText') : this.classList.remove('invalidText')
    btnEncrypt.disabled = invalidInput
    btnDecrypt.disabled = invalidInput
    textarea.style.height = `${textarea.scrollHeight}px`
}

btnEncrypt.onclick = () => btnActions.encrypt(textarea)
btnDecrypt.onclick = () => btnActions.decrypt(textarea)
$('#copy').onclick = function () { btnActions.copy(this) }