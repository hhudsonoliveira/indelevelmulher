# INDELÉVEL MULHER — landing page

Página única, HTML/CSS/JS puro, pronta para GitHub Pages.

```
index.html
css/style.css
js/script.js
assets/img/
  hero-mulher-executiva.jpeg      (recorte do flyer — TROCAR pela foto oficial em alta)
  og-indelevel-mulher.jpeg        (banner 1200x630 — prévia do WhatsApp)
  flyer-indelevel-mulher.jpeg     (flyer original, para referência)
  logo-bras-business-school.png   (marca oficial do BRAS, recortada e reduzida)
```

## Antes de publicar

1. **URLs absolutas do Open Graph** — `og:url`, `og:image`, `twitter:image` e
   `canonical` apontam para `https://indelevelmulher.com.br/`. Se o domínio mudar,
   trocar as quatro: o WhatsApp só exibe a prévia com URL absoluta.
2. **Imagens** — substituir os arquivos em `assets/img/` mantendo os mesmos nomes.
   A foto do hero sangra pela lateral direita no desktop e vira uma camada de
   atmosfera atrás do texto no mobile — funciona melhor com uma imagem larga
   (aprox. 1600×950) com a pessoa à direita. A imagem de OG funciona melhor em
   1200×630 ou no formato do flyer.
3. **Hospedagem** — Hostinger, upload manual. Subir apenas `index.html`,
   `css/`, `js/` e os três arquivos usados em `assets/img/`.

## Dados do evento (fonte única)

| Item | Onde está |
|---|---|
| Datas, horário e local | `index.html` — hero, seção Formato e rodapé |
| Alvo da contagem regressiva | `index.html` — `data-target="2026-10-02T08:00:00-03:00"` (America/Bahia) |
| Preços | hero, seção Investimento, CTA final e barra fixa do mobile |
| Link de checkout | 5 CTAs + link do rodapé, todos para `pag.ae/826pQVu7J` |

## Animação

Dois momentos, e só dois:

- **Reveal do hero** (CSS, roda uma vez no carregamento): "INDELÉVEL" sobe atrás de
  uma máscara, "Mulher" é revelado por um wipe da esquerda para a direita, e o resto
  entra escalonado. Curva `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Contagem regressiva**: só o dígito que muda rola para cima (220 ms). Os demais
  ficam parados.

Com `prefers-reduced-motion: reduce`, o hero entra apenas em opacidade e os dígitos
trocam sem rolagem.
