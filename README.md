# Fátima Guilherme · Podóloga — site

Site estático (HTML + CSS + JS puro), sem build. Pronto para a Vercel.

## Deploy na Vercel
1. Importe este repositório na Vercel (Framework Preset: **Other**, sem build command, output = raiz).
2. Conecte o domínio. O site usa `https://fatimaguilherme.com.br` como domínio canônico.
   Se o domínio for outro, troque em: `index.html` (canonical, og, JSON-LD), `sitemap.xml`, `robots.txt`, `llms.txt`.

## Fotos (troca rápida)
Coloque os arquivos em `assets/img/` com estes nomes. Se não existirem, o layout mostra o fallback com o monograma.
- `fatima.jpg` — retrato vertical da Fátima (~1000×1250), usado no hero
- `consultorio.jpg` — foto do consultório (4:5)
- `fatima-atendendo.jpg` — foto atendendo (quadrada)

## SEO / GEO
- JSON-LD: MedicalBusiness + Person + WebSite + FAQPage
- `robots.txt` liberando buscadores e bots de IA, `sitemap.xml`, `llms.txt`
- Open Graph com `assets/img/og-image.jpg` (1200×630)
