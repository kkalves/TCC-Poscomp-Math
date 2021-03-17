import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";

import styles from "../../styles/AboutStyle";

export default class AboutAppScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Sobre o POSCOMP Math:</Text>
        <Text style={styles.paragraph}>
          A concepção do POSCOMP Math tem como foco o apoio ao processo
          orientado pelo modelo de aprendizagem especialmente no que se refere a
          sua oferta de resoluções passo a passo com sequências de instruções
          planejadas para levar o educando ao conhecimento.
        </Text>
        <Text style={styles.paragraph}>
          O Aplicativo consiste em um banco de questões dos anos anteriores,
          apresentadas no formato de quiz, focadas na área da matemática. O
          aplicativo divide seu simulado em módulos, sendo eles:
        </Text>
        <Text style={styles.paragraph}>
          - Simulado Padrão: Será gerada uma simulação de questões aleatórias
          entre as diversas subáreas da área da matemática com 20 questões em
          seu total, assim como o proposto pelo exame do POSCOMP;
        </Text>
        <Text style={styles.paragraph}>
          -Simulado por Ano: Nesta modalidade o usuário escolherá resolver
          integralmente questões apresentadas no POSCOMP referentes a um dos
          anos anteriores;
        </Text>
        <Text style={styles.paragraph}>
          -Simulado por Subárea: o estudante poderá escolher o número de
          questões a serem respondidas referentes a uma área de conhecimento.
        </Text>
        <Text style={styles.paragraph}>
          Em cada simulado respondido uma mensagem será retornada informando se
          o usuário acertou ou errou a questão, e para quem desejar, estará
          disponível sua resolução passo a passo.
        </Text>
        <View style={{ margin: 20 }}></View>
      </ScrollView>
    );
  }
}
