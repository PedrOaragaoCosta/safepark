# Safepark — Zona Azul do Centro do Recife (v0.1 de teste)

Aplicativo que mostra a ocupação da Zona Azul em quatro micro-regiões do Centro do Recife
(Recife Antigo, Santo Antônio, São José e Boa Vista). Todos os dados são simulados.

## O que esta versão faz

| Requisito | O que aparece na tela | Regras |
|---|---|---|
| RF01 | Mapa esquemático com as 4 micro-regiões, vagas totais e ocupadas | RN01 |
| RF02 | Escolher o destino; ele fica destacado no mapa | RN01 |
| RF03 | % de ocupação do destino e da Zona Azul inteira | RN02, RN03 |
| RF05 | Avisar a saída de uma vaga: a ocupação diminui e o motorista ganha 10 pontos; se não houver vaga ocupada, aparece um aviso de erro | RN06, RN07 |

Nada fica salvo: ao recarregar a página, os números voltam ao início.

## Publicar no GitHub Pages (passo a passo)

1. No GitHub, crie um repositório novo (por exemplo `safepark`), público.
2. Envie **todos** os arquivos desta pasta para o repositório, na branch `main`.
   - Pelo site: **Add file → Upload files** e arraste o conteúdo da pasta.
   - Atenção: a pasta `.github` começa com ponto e pode ficar escondida no seu computador.
     Ela é obrigatória. Se ela não subir, veja "Se a pasta .github não subir" abaixo.
3. No repositório, vá em **Settings → Pages** e, em **Build and deployment → Source**, escolha **GitHub Actions**.
4. Vá na aba **Actions**. O processo "Publicar no GitHub Pages" roda sozinho (se não rodar,
   abra-o e clique em **Run workflow**). Leva uns 2 minutos.
5. O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Toda vez que você enviar uma alteração para a `main`, o site é publicado de novo automaticamente.

### Se a pasta .github não subir

No GitHub, clique em **Add file → Create new file**, digite o nome
`.github/workflows/deploy-pages.yml`, cole o conteúdo do arquivo de mesmo nome desta pasta
(abra-o com o Bloco de Notas) e clique em **Commit changes**.

## Rodar no computador

Precisa do [Bun](https://bun.sh) instalado.

```sh
bun install
bun run dev          # abre o app em modo de desenvolvimento
bun run test         # roda os testes das regras (RN02, RN03, RN06, RN07)
bun run build:pages  # gera o site estático na pasta dist-pages/
```

## Onde fica cada coisa

- `src/data/` — dados simulados das micro-regiões e dos motoristas.
- `src/lib/` — regras do documento (cálculo de ocupação, aviso de saída), com testes.
- `src/components/safepark/` — partes da tela (mapa, percentuais, aviso de saída).
- `pages/` e `vite.pages.config.ts` — versão estática para o GitHub Pages.
- `.github/workflows/deploy-pages.yml` — publicação automática no GitHub Pages.
