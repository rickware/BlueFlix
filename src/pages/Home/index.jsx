/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import categoriasRepository from '../../repositories/categorias';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';

const Main = styled.main`
  background-color: var(--wine);
  color: var(--orange);
  flex: 1;
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
`;

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    // http://localhost:8080/categorias?_embed=videos
    categoriasRepository.getAllWithVideos()
      .then((categoriasComVideos) => {
        // console.log(categoriasComVideos[0].videos[0]);
        setDadosIniciais(categoriasComVideos);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Main>
      <Menu />
      {dadosIniciais.length === 0 && (<div>Loading...</div>)}
      {dadosIniciais.map((categoria, indice) => {
        if (indice === 0) {
          return (
            <div key={categoria.id}>
              <BannerMain
                videoTitle={dadosIniciais[0].videos[0].titulo}
                url={dadosIniciais[0].videos[0].url}
                videoDescription={dadosIniciais[0].videos[0].description}
              />
              <Carousel
                ignoreFirstVideo
                category={dadosIniciais[0]}
              />
            </div>
          );
        }

        return (
          <Carousel
            key={categoria.id}
            category={categoria}
          />
        );
      })}
      <Footer />
    </Main>
  );
}

export default Home;
