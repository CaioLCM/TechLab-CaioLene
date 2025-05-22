import 'dotenv/config'

try{
    // REQUISIÇÃO GET PARA O BANCO DE DADOS, VOLTANDO DADOS REFERENTES AOS GÊNEROS
    const Resposta = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`, {
        method: "get"
    })
    if (!Resposta.ok){
            throw new Error(`Falha durante a requisição! Status code: ${Resposta.status}`)
        }
    const Resposta_json = await Resposta.json()
    const generos = Resposta_json["genres"]

    // FILTRAGEM DE GÊNEROS QUE COMEÇAM COM A LETRA "A"
    let generosA = [];
    
    generos.forEach((genero) => {
        if(genero['name'][0] == "A"){
            generosA.push(genero["id"])
        }
    })

    // BUSCANDO OS FILMES DOS RESPECTIVOS GÊNEROS
    let lista_filmes = [];
    console.log(generosA)
    for (const id of generosA){
        const Resposta_filmes = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${id}`, {
            method: "get"
        })
        if (!Resposta_filmes.ok){
            throw new Error(`Falha durante a requisição! Status code: ${Resposta_filmes.status}`)
        }
        const Resposta_filmes_json = await Resposta_filmes.json()
        const filmes = Resposta_filmes_json["results"]
        filmes.forEach((filme) => {
            lista_filmes.push({"id": filme["id"], "título": filme["title"], "url_pôster": `https://image.tmdb.org/t/p/w500${filme["poster_path"]}`})
        })
    }

    console.log(lista_filmes)

} catch(error){
    console.log("Erro capturado: ", error.message)
}
