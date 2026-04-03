'use client';
import { useState, useEffect } from 'react';
import Dado from './components/dado';

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [dadosA, setDadosA] = useState([0, 0]);
  const [dadosB, setDadosB] = useState([0, 0]);
  const [girando, setGirando] = useState(false);
  const [vezDoA, setVezDoA] = useState(true);
  const [pontosAcumuladosA, setPontosAcumuladosA] = useState(0);
  const [pontosAcumuladosB, setPontosAcumuladosB] = useState(0);
  const [statusA, setStatusA] = useState("");
  const [statusB, setStatusB] = useState("");
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [quemComecouEstaRodada, setQuemComecouEstaRodada] = useState(true);
  const [aguardandoProximaRodada, setAguardandoProximaRodada] = useState(false);

  useEffect(() => {
    const sorteio = Math.random() < 0.5;
    setVezDoA(sorteio);
    setQuemComecouEstaRodada(sorteio);
  }, []);

  const rolar = () => Math.floor(Math.random() * 6) + 1;

  const reiniciarJogo = () => {
    const sorteioNovo = Math.random() < 0.5;
    setRodada(1);
    setDadosA([0, 0]);
    setDadosB([0, 0]);
    setPontosAcumuladosA(0);
    setPontosAcumuladosB(0);
    setFimDeJogo(false);
    setAguardandoProximaRodada(false);
    setStatusA("");
    setStatusB("");
    setVezDoA(sorteioNovo);
    setQuemComecouEstaRodada(sorteioNovo);
  };

  const verificarFimRodada = (sA, sB) => {
    let proximoIniciante;
    if (sA > sB) {
      setStatusA(`VENCEU (+${sA})`); setStatusB(`PERDEU`);
      setPontosAcumuladosA(prev => prev + sA);
      proximoIniciante = true;
    } else if (sB > sA) {
      setStatusA(`PERDEU`); setStatusB(`VENCEU (+${sB})`);
      setPontosAcumuladosB(prev => prev + sB);
      proximoIniciante = false;
    } else {
      setStatusA(`EMPATOU`); setStatusB(`EMPATOU`);
      proximoIniciante = Math.random() < 0.5;
    }
    setQuemComecouEstaRodada(proximoIniciante);
    setAguardandoProximaRodada(true);
  };

  const iniciarNovaRodada = () => {
    if (rodada >= 5) {
      setFimDeJogo(true);
    } else {
      setRodada(prev => prev + 1);
      setDadosA([0, 0]);
      setDadosB([0, 0]);
      setStatusA("");
      setStatusB("");
      setVezDoA(quemComecouEstaRodada);
      setAguardandoProximaRodada(false);
    }
  };

  const jogarA = () => {
    setGirando(true);
    setStatusA(""); setStatusB("");
    setTimeout(() => {
      const novosA = [rolar(), rolar()];
      setDadosA(novosA);
      setGirando(false);
      if (quemComecouEstaRodada) setVezDoA(false);
      else verificarFimRodada(novosA[0] + novosA[1], dadosB[0] + dadosB[1]);
    }, 800);
  };

  const jogarB = () => {
    setGirando(true);
    setStatusA(""); setStatusB("");
    setTimeout(() => {
      const novosB = [rolar(), rolar()];
      setDadosB(novosB);
      setGirando(false);
      if (!quemComecouEstaRodada) setVezDoA(true);
      else verificarFimRodada(dadosA[0] + dadosA[1], novosB[0] + novosB[1]);
    }, 800);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 p-4 font-sans uppercase italic text-center text-white">
      <div className="bg-black border-2 border-zinc-800 rounded-[3rem] p-12 w-full max-w-[850px] shadow-2xl relative">
        <div className="flex justify-between items-center mb-8 px-4">
          <div className="text-left">
            <p className="text-zinc-500 text-xs font-black">PONTOS A</p>
            <p className="text-4xl font-black text-white">{pontosAcumuladosA}</p>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-white">Rodada {rodada}/5</h1>
          <div className="text-right">
            <p className="text-zinc-500 text-xs font-black">PONTOS B</p>
            <p className="text-4xl font-black text-white">{pontosAcumuladosB}</p>
          </div>
        </div>

        {!fimDeJogo ? (
          <>
            <div className="flex justify-center gap-16 mb-20">
              <div className="flex flex-col items-center gap-6">
                <div className="flex gap-2 p-5 bg-zinc-900 rounded-2xl border border-zinc-800">
                  <Dado valor={dadosA[0]} girando={girando && vezDoA} />
                  <Dado valor={dadosA[1]} girando={girando && vezDoA} />
                </div>
                <p className={`text-2xl font-black ${statusA.includes('VENCEU') ? 'text-green-500' : statusA.includes('PERDEU') ? 'text-red-500' : statusA.includes('EMPATOU') ? 'text-yellow-500' : 'text-zinc-800'}`}>
                  {statusA || "AGUARDANDO"}
                </p>
              </div>
              <div className="flex flex-col items-center gap-6">
                <div className="flex gap-2 p-5 bg-zinc-900 rounded-2xl border border-zinc-800">
                  <Dado valor={dadosB[0]} girando={girando && !vezDoA} />
                  <Dado valor={dadosB[1]} girando={girando && !vezDoA} />
                </div>
                <p className={`text-2xl font-black ${statusB.includes('VENCEU') ? 'text-green-500' : statusB.includes('PERDEU') ? 'text-red-500' : statusB.includes('EMPATOU') ? 'text-yellow-500' : 'text-zinc-800'}`}>
                  {statusB || "AGUARDANDO"}
                </p>
              </div>
            </div>

            <div className="flex justify-center w-full max-w-2xl mx-auto">
              {aguardandoProximaRodada ? (
                <button onClick={iniciarNovaRodada} className="w-full py-6 rounded-2xl font-black text-2xl border-2 bg-white text-black border-white shadow-xl animate-pulse">
                  {rodada >= 5 ? "VER RESULTADO FINAL" : "PRÓXIMA RODADA"}
                </button>
              ) : (
                <div className="flex gap-6 w-full">
                  <button disabled={!vezDoA || girando} onClick={jogarA} className={`flex-1 py-6 rounded-2xl font-black text-2xl border-2 transition-all ${vezDoA ? 'bg-white text-black border-white shadow-xl' : 'bg-transparent text-zinc-900 border-zinc-900 opacity-20'}`}>
                    JOGADOR A
                  </button>
                  <button disabled={vezDoA || girando} onClick={jogarB} className={`flex-1 py-6 rounded-2xl font-black text-2xl border-2 transition-all ${!vezDoA ? 'bg-white text-black border-white shadow-xl' : 'bg-transparent text-zinc-900 border-zinc-900 opacity-20'}`}>
                    JOGADOR B
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white text-black p-12 rounded-[2.5rem] shadow-2xl border-b-8 border-zinc-300">
            <p className="text-xs font-bold opacity-40 mb-2 tracking-widest">FIM DE JOGO</p>
            <h2 className="text-5xl font-black mb-4 tracking-tighter">
              {pontosAcumuladosA > pontosAcumuladosB ? "VITÓRIA DO JOGADOR A!" : 
               pontosAcumuladosB > pontosAcumuladosA ? "VITÓRIA DO JOGADOR B!" : 
               "EMPATE GERAL!"}
            </h2>
            <p className="text-2xl font-black mb-8 opacity-60">{pontosAcumuladosA} VS {pontosAcumuladosB}</p>
            <button onClick={reiniciarJogo} className="w-full py-5 bg-black text-white rounded-2xl font-black text-xl uppercase">Jogar Novamente</button>
          </div>
        )}
      </div>
    </main>
  );
}