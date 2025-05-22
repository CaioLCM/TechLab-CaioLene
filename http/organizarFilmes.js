function organizarFilmes(id_release, qtd) {
    // ORDENAÇÃO DOS FILMES
    const ordenados = [...id_release].sort((a, b) => {
        if (b.Ano !== a.Ano) return b.Ano - a.Ano;
        if (b["Mês"] !== a["Mês"]) return b["Mês"] - a["Mês"];
        return b.Dia - a.Dia;
    });

    // Pegar os 'qtd' primeiros e salvar na lista_final
    const lista_final = ordenados.slice(0, qtd);

    return lista_final;
}

export default organizarFilmes;