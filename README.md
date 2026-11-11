# Fátima Guilherme · Podóloga — site

Site estático (HTML + CSS + JS puro), sem build. Pronto para a Vercel.

## Deploy na Vercel
1. Importe este repositório na Vercel (Framework Preset: **Other**, sem build command, output = raiz).
2. Conecte o domínio. Hoje o domínio canônico é `https://fatimaguilherme.vercel.app`.
   Quando comprar o domínio próprio, troque esse endereço em: `index.html` (canonical, og, JSON-LD), `sitemap.xml`, `robots.txt`, `llms.txt`.

## Identidade
Cores do logo da Fátima: fundo branco, verde `#1F6B45` (anel e monograma FG), vermelho `#CC2A2F` (pezinho).

## Fotos
- `assets/img/fatima.jpg` — retrato do hero (recorte vertical)
- `assets/img/consultorio.jpg` — placa com o logo, seção Sobre
- `assets/img/fatima-podologa-balneario-camboriu.jpg` — foto quadrada usada nos dados estruturados

## SEO / GEO
- JSON-LD: MedicalBusiness + Person + WebSite + FAQPage
- `robots.txt` liberando buscadores e bots de IA, `sitemap.xml`, `llms.txt`
- Open Graph com `assets/img/og-image.jpg` (1200×630)
