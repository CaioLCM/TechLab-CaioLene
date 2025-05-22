import organizarFilmes from "./organizarFilmes.js";
import 'dotenv/config'

try{
    // REQUISIÇÃO GET PARA O BANCO DE DADOS DO FILME
    const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`, {
    method: "get"
})
    // VERIFICAÇÃO DO STATUS CODE DA REQUISIÇÃO
    if (!data.ok){
        throw new Error("Resposta diferente de status code 200!!!");
    }


    // TRANSFORMEI AS INFORMAÇÕES DA REQUISIÇÃO EM JSON
    const data_json = await data.json();


    // FILTREI O JSON APENAS PARA "RESULTS", ONDE CONTÉM OS FILMES
    const data_json_filmes = data_json['results']


    // CRIEI UMA LISTA CONTENDO OS FILMES E OS SEUS SEGUINTES DADOS: ID, TÍTULO, DATA DE LANÇAMENTO, DESCRIÇÃO,   
    const filmes = []
    data_json_filmes.forEach((data) => filmes.push({"ID": data['id'], "Título": data["title"], "Data de lançamento": data["release_date"], "Descrição": data["overview"]}))
    

    // CRIEI OUTRA LISTA CONTENDO O ID DO FILME, ANO DE LANÇAMENTO, MÊS E DIA (TRANSFORMANDO OS VALORES REFERENTES A DATA EM INTEIRO)
    const id_release = []
    data_json_filmes.forEach((filme) => id_release.push({"ID": filme['id'], "Título": filme["title"],  'Ano': parseInt(filme['release_date'].split('-')[0]), "Mês": parseInt(filme['release_date'].split('-')[1]), "Dia": parseInt(filme['release_date'].split('-')[2])}))


    // ÚLTIMOS FILMES LANÇADOS EM PRIMEIRO
    const ultimos_filmes = organizarFilmes(id_release, 5)


    // BUSCANDO O LINK DO TRAILER DE CADA UM DOS ÚLTIMOS FILMES LANÇADOS
    const ID_trailer = []
    var req;

   for (const filme of ultimos_filmes){
        req = await fetch(`https://api.themoviedb.org/3/movie/${filme["ID"]}/videos?api_key=${process.env.API_KEY}`, {
        method: "get"
    })
        req = await req.json()
        req = req["results"]?.[0]?.["key"]
        if (req != undefined){
            ID_trailer.push({"ID": filme["ID"], "Nome": filme["Título"], "Trailer": req? `https://www.youtube.com/watch?v=${req}` : "Sem trailer"})
        }
        else if (req == undefined) {
            ID_trailer.push({"ID": filme["ID"], "Nome": filme["Título"], "Trailer": "Sem trailer"})
        }
    }
    console.log(ID_trailer)
} catch (error) {
    console.log(`Erro durante a requisição! ${error}`);
}
