const ws = new WebSocket("ws://localhost:9876")
const messages = document.getElementById("messages")
const input = document.getElementById("message")
const account = document.getElementById("name")
const button = document.getElementById("button")
button.disabled = true
button.addEventListener('click', sendMessage)
ws.onopen = () => {
    button.disabled = false
}

ws.onmessage = (event) => {
    let { data } = event
    data=JSON.parse(data)
    const { name, message } = data
    const el = document.createElement("div")
    const p1 = document.createElement("p")
    const p2 = document.createElement("p")
    p1.innerText = name
    p2.innerText = message
    if (name !== account.value) {
        el.className = "right"
        const d = document.createElement("div")
        d.appendChild(p1)
        d.appendChild(p2)
        el.appendChild(d)
    }
    else {
        el.appendChild(p1)
        el.appendChild(p2)
        el.className="left"
    }
    messages.appendChild(el)
    input.value = ""
}

function sendMessage() {
    if (!account.value || !input.value) {
        window.alert('name and message fields are not empty')
        return;
    }
    ws.send(JSON.stringify({ name: account.value, message: input.value }))
}