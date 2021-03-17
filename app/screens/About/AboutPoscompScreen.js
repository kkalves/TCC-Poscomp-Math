import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";

import styles from "../../styles/AboutStyle";

export default class AboutPoscompScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Sobre o POSCOMP:</Text>

        <Text style={styles.paragraph}>
          O Exame Nacional para Ingresso na Pós-Graduação em Computação
          (POSCOMP), coordenado pela Sociedade Brasileira de Computação (SBC)
          objetiva analisar conhecimentos na área da computação, servindo como
          um parâmetro parcial para o ingresso de candidatos a programas de
          Pós-Graduação Stricto Sensu em Computação e em áreas afins em todo o
          território brasileiro.
        </Text>
        <Text style={styles.paragraph}>
          Com o intuito de testar conhecimentos na área da Computação avaliam-se
          competências, distribuídas em setenta questões objetivas, subdivididas
          entre as áreas de matemática, fundamentos e tecnologia da computação.
        </Text>
        <Text style={styles.paragraph}>
          O POSCOMP é realizado em uma única etapa, por meio de Prova
          Teórico-objetiva com duração de quatro horas para resolução e
          preenchimento da grade de respostas. A prova é de múltipla escolha,
          com cinco alternativas devendo o candidato assinalar apenas uma única
          resposta para cada questão.
        </Text>
        <Text style={styles.paragraph}>
          A área da matemática, foco deste aplicativo, divide-se em sete
          subáreas, que por sua vez, subdividem-se em diversos outros conteúdos,
          sendo elas: Álgebra Linear, Análise Combinatória, Cálculo Diferencial
          e Integral, Geometria Analítica, Lógica Matemática, Matemática
          Discreta, Probabilidade e Estatística.
        </Text>
        <View style={{ marginBottom: 20 }} />
      </ScrollView>
    );
  }
}
