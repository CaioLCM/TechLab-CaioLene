import 'dotenv/config'
import readline from 'node:readline'


try{
    // REQUISIÇÃO GET PARA O BANCO DE DADOS, VOLTANDO DADOS REFERENTES AOS FILMES EM ALTA E CONTAGEM DE VOTOS
    const Resposta = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}`, {
        method: "get"
    })

    if (!Resposta.ok){
            throw new Error(`Falha durante a requisição! Status code: ${Resposta.status}`)
        }

    // TRANSFORMEI AS INFORMAÇÕES DA REQUISIÇÃO EM JSON
    const Resposta_json = await Resposta.json();


    // FILTREI O JSON APENAS PARA "RESULTS", ONDE CONTÉM OS FILMES
    const Resposta_json_filmes = Resposta_json['results']


    // EXTRAINDO OS DADOS DOS FILMES PRESENTES
    let filmes = []
    Resposta_json_filmes.forEach((filme) => {
        filmes.push({"ID": filme["id"], "Título": filme["title"], "Data de lançamento": filme["release_date"], "Média de votos": filme["vote_average"], "descrição": filme["overview"]})
    })

    // IMPLEMENTAÇÃO DE UM MENU INTERATIVO PARA A ESCOLHA DO FILME
    let escolhaUsuario = ""
    
    function perguntar(){
        return new Promise((resolve) => {
            const r1 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
    })
        r1.question(`Escolha o filme e veja a quantidade de votos: `, escolhaUsuario => {
            r1.close();
            resolve(escolhaUsuario);
        });
    }
)
}

    filmes.forEach((filme) => {
        console.log(filme["Título"])
    })

    const escolha = await perguntar()

    // BUSCA PELA CONTAGEM DE VOTOS DO FILME ESCOLHIDO PELO USUÁRIO
    for (const filme of filmes){
        if (filme["Título"] == escolha){
             const Resposta2 = await fetch(`https://api.themoviedb.org/3/movie/${filme["ID"]}?api_key=${process.env.API_KEY}`, {
                                method: "get"
    })

    if (!Resposta2.ok){
            throw new Error(`Falha durante a requisição! Status code: ${Resposta.status}`)
        }


    const Resposta2_json = await Resposta2.json()

    const Resposta2_json_contagemDeVotos = Resposta2_json["vote_average"]

    console.log(Resposta2_json_contagemDeVotos)            
        }
    }

} catch(error){
    console.log(`Erro capturado: ${error.message}`)
}