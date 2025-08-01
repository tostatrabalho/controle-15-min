import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// 🔐 Substitua essas constantes com seus valores reais:
const SUPABASE_URL = "https://ochhmishdtxwprhnlenj.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jaGhtaXNoZHR4d3ByaG5sZW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjYzNDYsImV4cCI6MjA2OTY0MjM0Nn0.Qn4GsAFQkEc32zoeeY0pfIU96ivmQb51mVtF_l8he30";

const client = createClient(SUPABASE_URL, SUPABASE_KEY)

const COLABORADORES = [
  "Alisson", "Maicon", "Tiago Barbosa", "Vinicius", "Rafael", "Yago",
  "Maria", "Caique", "Pedro", "Gerson", "Gabrielle", "Carla",
  "Thiago Silva", "Jefferson", "Douglas"
]

const select = document.getElementById("colaborador-select")
const lista = document.getElementById("em-pausa")

COLABORADORES.forEach(nome => {
  const option = document.createElement("option")
  option.value = nome
  option.textContent = nome
  select.appendChild(option)
})

// 👇 Torna a função acessível no HTML (escopo global)
window.registrar = async function registrar(tipo) {
  const nome = select.value
  const data = new Date().toISOString()

  if (!nome) {
    alert("Selecione um colaborador.")
    return
  }

  if (tipo === "entrou") {
    const { data: emPausa, error } = await client.from("pausas").select("*").is("fim", null)
    if (error) {
      console.error(error)
      alert("Erro ao consultar pausas.")
      return
    }

    if (emPausa.some(p => p.nome !== nome)) {
      alert("Alguém já está nos 15 minutos!")
      return
    }

    await client.from("pausas").insert([{ nome, inicio: data }])
  } else {
    await client.from("pausas").update({ fim: data }).eq("nome", nome).is("fim", null)
  }

  listar()
}

async function listar() {
  const { data, error } = await client.from("pausas").select("*").is("fim", null)
  if (error) {
    console.error(error)
    return
  }

  lista.innerHTML = ""
  data.forEach(p => {
    const li = document.createElement("li")
    const inicio = new Date(p.inicio)
    const volta = new Date(inicio.getTime() + 15 * 60000)
    li.textContent = `${p.nome} - Volta às ${volta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    lista.appendChild(li)
  })
}

listar()
