import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt">
      <title>SET - Semana Empresarial e Tecnológica</title>
      <meta
        name="description"
        content="Feira Empresarial e Tecnológica do Instituto Superior Técnico. Encontra o teu estágio ou emprego de 13 a 16 de março."
      />
      <meta
        name="keywords"
        content="SET, Técnico Lisboa, Tecnologia, Feira de Emprego, Inovação, Inteligência Artificial, Ciber-segurança, Consultoria"
      />
      <meta name="theme-color" content="#228be6"></meta>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className=" bg-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
