const $ = query => document.querySelector(query)

const buttonActions = (() => {
    const dictionary = { 'e': 'enter', 'i': 'imes', 'a': 'ai', 'o': 'ober', 'u': 'ufat' }
    const textarea = $('#input-section textarea')
    const output = $('#output')
    const DefaultMessage = $('#message').classList
    const showOutput = newText => {
        output.firstElementChild.textContent = newText
        output.classList.remove('d-none')
        DefaultMessage.add('d-none')
    }
    return {
        encrypt: () => showOutput(textarea.value.replace(/[aeiou]/gm, match => dictionary[match])),
        decrypt: () => showOutput(textarea.value.replace(/enter|imes|ai|ober|ufat/gm, match => match[0])),
        copy: () => console.log(output.firstElementChild.textContent)
    }
})()

$('#encrypt').onclick = buttonActions.encrypt
$('#decrypt').onclick = buttonActions.decrypt
$('#copy').onclick = buttonActions.copy