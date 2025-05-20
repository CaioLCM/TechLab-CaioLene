try{
    const data = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=f3a2228e07603777fda8ccfb166a55334", {
    method: "get"
})
    if (!data.ok){
        throw new Error("Resposta diferente de status code 200!!!");
    }
    const filmes = []

    const new_data = await data.json();

    const new_new_data = new_data['results']
    new_new_data.forEach((data) => filmes.push({"ID": data['id'], "Título": data["title"], "Data de lançamento": data["release_date"], "Descrição": data["overview"]}))
    //new_new_data.forEach((data) => console.log(data['id']))
    filmes.forEach((filme) => console.log(filme))

} catch (error) {
    console.log(`Erro durante a requisição! ${error}`);
}
