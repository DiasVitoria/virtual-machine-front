import Urls from "./urls";

const URL = new Urls()

export async function getAllClientes(): Promise<any[]> {
    await fetch(URL.CLIENTES, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(r => r.json()).then(r => {
        return r
      });
  return []
}

export function getClienteById(id: number) {
    fetch(URL.CLIENTES + "/" + id, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(r => r.json()).then(r => {
        return r
      });
}

export async function atualizarCliente(id: number, mapeado): Promise<boolean> {
    let retorno = false
    await fetch(URL.CLIENTES_MODIFICAR + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mapeado)
    }).then(r => {
        retorno = r.status === 200
    })
    return retorno
}

export async function cadastrarCliente(mapeado): Promise<boolean> {
    let retorno = false
    await fetch(URL.CLIENTES_CADASTRAR, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mapeado)
    }).then(r => {
        retorno = r.status === 200
    })
    return retorno
}


export async function deleteCliente(id: number): Promise<boolean>  {
    let retorno = false
    await fetch(URL.CLIENTES_DELETAR + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      retorno = response.status === 200
    })  
    return retorno
}


