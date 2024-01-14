let listaDeNumerosSorteados = [];
let numeroLimite = 25;
let tentativas = 1;
let numeroSecreto = gerarNumeroAleatorio();


function exibirMensagemNaTela(tag, texto)
{
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function gerarNumeroAleatorio() 
{
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if ( quantidadeDeElementosNaLista == numeroLimite )
    {
        listaDeNumerosSorteados = [];
    }

    if( listaDeNumerosSorteados.includes(numeroEscolhido) )
    {
        return gerarNumeroAleatorio();
    }
    else
    {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }

}

function limparCampo()
{
    chute = document.querySelector('input');
    chute.value = '';
}

function exibirMensagemInicial()
{
    exibirMensagemNaTela('h1', 'Jogo do número secreto');
    exibirMensagemNaTela('p', `Escolha um número entre 1 e ${numeroLimite}:`);
}

exibirMensagemInicial();

function verificarChute()
{
    let chute = document.querySelector('input').value;

    if( numeroSecreto == chute )
    {
        let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';

        let respostaCerta = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;

        exibirMensagemNaTela('h1', 'Boa!');
        exibirMensagemNaTela('p', respostaCerta);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else 
    {
        if( numeroSecreto > chute )
        {
            exibirMensagemNaTela('h1', 'Opa!');
            exibirMensagemNaTela('p', 'Tente um número maior.');
        }
        else
        {
            exibirMensagemNaTela('h1', 'Vish!');
            exibirMensagemNaTela('p', 'Tente um número menor.');
        }

        tentativas++;
        limparCampo();
    }
}

function reiniciarJogo()
{
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    exibirMensagemInicial();
    
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}