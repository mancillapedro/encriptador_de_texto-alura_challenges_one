const $ = query => document.querySelector(query)

const btnActions = (() => {
    const dictionary = { 'e': 'enter', 'i': 'imes', 'a': 'ai', 'o': 'ober', 'u': 'ufat' }
    const output = $('#output > p')
    const showOutput = newText => {
        output.textContent = newText
        output.parentElement.classList.remove('d-none')
        $('#message').classList.add('d-none')
    }
    return {
        encrypt: input => showOutput(input.value.replace(/[aeiou]/gm, match => dictionary[match])),
        decrypt: input => showOutput(input.value.replace(/enter|imes|ai|ober|ufat/gm, match => match[0])),
        copy: () => navigator.clipboard.writeText(output.textContent)
    }
})()

const textarea = $('#input-section textarea')
const btnEncrypt = $('#encrypt')
const btnDecrypt = $('#decrypt')

textarea.oninput = function () {
    const invalidInput = /^\s*$|[^a-z\s!?¿?¡\.,;]/g.test(this.value)
    this.classList.add('validated')
    invalidInput ? this.classList.add('invalidText') : this.classList.remove('invalidText')
    btnEncrypt.disabled = invalidInput
    btnDecrypt.disabled = invalidInput
}

btnEncrypt.onclick = () => btnActions.encrypt(textarea)
btnDecrypt.onclick = () => btnActions.decrypt(textarea)
$('#copy').onclick = btnActions.copy